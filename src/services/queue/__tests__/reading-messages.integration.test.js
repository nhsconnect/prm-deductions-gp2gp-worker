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
  odsCode,
  ehrRequestMessage,
  pdsGeneralUpdateRequestAcceptedMessage,
  ehrRequestId,
  messageId,
  ehrRequestCompletedMessage
} from '../subscriber/__tests__/data/subscriber';

httpContext.enable();

jest.mock('../../../middleware/logging');
jest.unmock('stompit');
jest.mock('../../../config', () => ({
  initializeConfig: jest.fn().mockReturnValue({
    gpToRepoAuthKeys: 'fake-keys',
    gpToRepoUrl: 'http://localhost',
    repoToGpAuthKeys: 'more-fake-keys',
    repoToGpUrl: 'http://localhost',
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

  describe('Handle PDS Update successful', () => {
    const mockGpToRepoUrl = 'http://localhost';
    const mockGpToRepoAuthKeys = 'fake-keys';

    it('should tell the GPToRepo that the PDS Update has been successful', async () => {
      const headers = { reqheaders: { Authorization: `${mockGpToRepoAuthKeys}` } };
      const scope = nock(mockGpToRepoUrl, headers)
        .patch(`/deduction-requests/${conversationId}/pds-update`)
        .reply(204);
      await sendToQueue(pdsGeneralUpdateRequestAcceptedMessage, {
        destination: uniqueQueueName
      });
      await consumeOneMessage({ destination: uniqueQueueName });
      expect(scope.isDone()).toBe(true);
    });
  });

  describe('Handle EHR Request', () => {
    const mockRepoToGpUrl = 'http://localhost';
    const mockRepoToGpAuthKeys = 'more-fake-keys';

    it('should tell RepoToGP that an EHR request has been received', async () => {
      const headers = { reqheaders: { Authorization: `${mockRepoToGpAuthKeys}` } };
      const body = {
        data: {
          type: 'registration-requests',
          id: conversationId,
          attributes: {
            nhsNumber,
            odsCode,
            ehrRequestId
          }
        }
      };
      const scope = nock(mockRepoToGpUrl, headers).post(`/registration-requests/`, body).reply(201);

      await sendToQueue(ehrRequestMessage, {
        destination: uniqueQueueName
      });
      await consumeOneMessage({ destination: uniqueQueueName });
      expect(scope.isDone()).toBe(true);
    });
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
        useNewEhrRepoApi: true,
        ehrRepoUrl: 'http://localhost',
        ehrRepoAuthKeys: 'ehr-fake-keys',
        gpToRepoAuthKeys: 'fake-keys',
        gpToRepoUrl: 'http://localhost',
        repoToGpAuthKeys: 'more-fake-keys',
        repoToGpUrl: 'http://localhost',
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
