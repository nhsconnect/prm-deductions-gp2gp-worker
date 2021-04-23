import { v4 as uuid } from 'uuid';
import nock from 'nock';
import httpContext from 'async-local-storage';
import { initialiseSubscriber } from '../subscriber';
import { clearQueue, consumeOneMessage } from '../helper';
import { sendToQueue } from '../publisher';
import { initializeConfig } from '../../../config';
import {
  conversationId,
  nhsNumber,
  messageId,
  ehrRequestCompletedMessage
} from '../subscriber/__tests__/data/subscriber';

httpContext.enable();

jest.unmock('stompit');
jest.mock('../../../config', () => ({
  initializeConfig: jest.fn().mockReturnValue({
    gpToRepoAuthKeys: 'fake-keys',
    gpToRepoUrl: 'http://localhost',
    queueUrls: [process.env.GP2GP_WORKER_MHS_QUEUE_URL_1, process.env.GP2GP_WORKER_MHS_QUEUE_URL_2]
  })
}));

describe('Should read messages from the queue successfully', () => {
  let uniqueQueueName;
  let channel;

  beforeEach(async () => {
    uniqueQueueName = uuid();
    channel = await initialiseSubscriber({ destination: uniqueQueueName });
  });

  afterEach(async () => {
    channel.close();
    await clearQueue({ destination: uniqueQueueName });
  });

  describe('Handles EHR Extract', () => {
    const mockEhrRepoUrl = 'http://localhost';
    const mockEhrRepoAuthKeys = 'ehr-fake-keys';
    const headers = { reqheaders: { Authorization: `${mockEhrRepoAuthKeys}` } };
    const postRequestBody = {
      data: {
        type: 'messages',
        id: messageId,
        attributes: {
          conversationId,
          messageType: 'ehrExtract',
          nhsNumber,
          attachmentMessageIds: []
        }
      }
    };

    beforeEach(() => {
      initializeConfig.mockReturnValue({
        ehrRepoUrl: 'http://localhost',
        ehrRepoAuthKeys: 'ehr-fake-keys',
        gpToRepoAuthKeys: 'fake-keys',
        gpToRepoUrl: 'http://localhost',
        queueUrls: [
          process.env.GP2GP_WORKER_MHS_QUEUE_URL_1,
          process.env.GP2GP_WORKER_MHS_QUEUE_URL_2
        ]
      });
    });

    it('should fetch presigned url', async () => {
      const s3BasePath = 'http://localhost';

      const scope = nock(mockEhrRepoUrl, headers)
        .get(`/messages/${conversationId}/${messageId}`)
        .reply(200, `${s3BasePath}/some-url`);

      const putScope = nock(s3BasePath).put('/some-url').reply(200);

      const postScope = nock(mockEhrRepoUrl, headers).post('/messages', postRequestBody).reply(201);

      await sendToQueue(ehrRequestCompletedMessage, {
        destination: uniqueQueueName
      });
      await consumeOneMessage({ destination: uniqueQueueName });

      expect(scope.isDone()).toBe(true);
      expect(putScope.isDone()).toBe(true);
      expect(postScope.isDone()).toBe(true);
    });
  });
});
