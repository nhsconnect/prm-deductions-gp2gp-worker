import httpContext from 'async-local-storage';
import { v4 as uuid } from 'uuid';
import { initialiseSubscriber } from '../';
import { clearQueue, consumeOneMessage, sendToQueue } from '../../';
import { EHRRequestCompleted } from '../../../gp2gp';
import { ehrRequestCompletedMessage, unhandledInteractionId } from './data/subscriber';

httpContext.enable();

jest.unmock('stompit');
jest.unmock('uuid');
jest.mock('../../../gp2gp/ehr-request-completed');
jest.mock('../../../../config/logging');

describe('initialiseConsumer', () => {
  let uniqueQueueName;
  let channel;

  const mockEhrHandleMessage = jest
    .fn()
    .mockImplementation(() => 'EHRRequestCompleted handled message');

  beforeEach(async () => {
    EHRRequestCompleted.prototype.handleMessage = mockEhrHandleMessage;

    uniqueQueueName = uuid();
    channel = await initialiseSubscriber({ destination: uniqueQueueName });
  });

  afterEach(async () => {
    channel.close();
    await clearQueue({ destination: uniqueQueueName });
  });

  describe('when RCMR_IN030000UK06 (EHR Request Completed) Message is put on the queue', () => {
    it('should consume the message off the queue', async done => {
      await sendToQueue(ehrRequestCompletedMessage, {
        destination: uniqueQueueName
      });
      const message = await consumeOneMessage({ destination: uniqueQueueName });
      setImmediate(() => {
        expect(message).toEqual({});
        done();
      });
    });

    it('should call EHRRequestCompleted.handleMessage()', async done => {
      await sendToQueue(ehrRequestCompletedMessage, { destination: uniqueQueueName });
      // Below needed to wait for message to be consumed
      await consumeOneMessage({ destination: uniqueQueueName });
      expect(mockEhrHandleMessage).toHaveBeenCalledTimes(1);
      expect(mockEhrHandleMessage).toHaveBeenCalledWith(ehrRequestCompletedMessage);
      done();
    });
  });

  describe('when unhandled Interaction ID Message is put on the queue', () => {
    it('should consume the message off the queue (or else infinite loop)', async done => {
      await sendToQueue(unhandledInteractionId, { destination: uniqueQueueName });
      const message = await consumeOneMessage({ destination: uniqueQueueName });
      setImmediate(() => {
        expect(message).toEqual({});
        done();
      });
    });

    it('should not call EHRRequestCompleted.handleMessage()', async done => {
      await sendToQueue(unhandledInteractionId, { destination: uniqueQueueName });
      // Below needed to wait for message to be consumed
      await consumeOneMessage({ destination: uniqueQueueName });
      expect(mockEhrHandleMessage).toHaveBeenCalledTimes(0);
      done();
    });
  });
});
