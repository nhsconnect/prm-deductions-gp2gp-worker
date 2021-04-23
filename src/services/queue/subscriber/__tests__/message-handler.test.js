import { DefaultMessage, handleMessage } from '../';
import { logInfo, logError } from '../../../../config/logging';
import { EHRRequestCompleted, EHR_REQUEST_COMPLETED } from '../../../gp2gp';
import { parseMultipartBody } from '../../../parser';
import {
  ehrRequestCompletedMessage,
  messageWithoutAction,
  unhandledInteractionId
} from './data/message-handler';

jest.mock('../../../../config/logging');
jest.mock('../../../gp2gp/ehr-request-completed');
jest.mock('../default-message');
jest.mock('../../../parser/multipart-parser');

describe('handleMessage', () => {
  describe('EHRRequestCompleted', () => {
    beforeEach(() => {
      EHRRequestCompleted.prototype.handleMessage = jest
        .fn()
        .mockResolvedValue('EHRRequestCompleted handled message');

      parseMultipartBody.mockImplementation(() => [
        {
          body: `<Action>${EHR_REQUEST_COMPLETED}</Action>`
        }
      ]);
    });

    it('should call EHRRequestCompleted with the message if message is type RCMR_IN030000UK06', async done => {
      await handleMessage(ehrRequestCompletedMessage);
      expect(EHRRequestCompleted.prototype.handleMessage).toHaveBeenCalledTimes(1);
      expect(EHRRequestCompleted.prototype.handleMessage).toHaveBeenCalledWith(
        ehrRequestCompletedMessage
      );
      done();
    });

    it('should logInfo with the correct interactionId', async done => {
      await handleMessage(ehrRequestCompletedMessage);
      expect(logInfo).toHaveBeenCalledWith(`interactionId: ${EHR_REQUEST_COMPLETED}`);
      done();
    });
  });

  describe('DefaultMessage', () => {
    beforeEach(() => {
      DefaultMessage.prototype.handleMessage = jest
        .fn()
        .mockResolvedValue('DefaultMessage handled message');

      parseMultipartBody.mockImplementation(message => [
        {
          body: message
        }
      ]);
    });

    it('should call parseMultipartMessage with the message', async done => {
      await handleMessage('message');
      expect(parseMultipartBody).toHaveBeenCalledTimes(1);
      expect(parseMultipartBody).toHaveBeenCalledWith('message');
      done();
    });

    it('should call DefaultMessage if handleMessage cannot find the action', async done => {
      await handleMessage(messageWithoutAction);
      expect(DefaultMessage.prototype.handleMessage).toHaveBeenCalledTimes(1);
      expect(DefaultMessage.prototype.handleMessage).toHaveBeenCalledWith(messageWithoutAction);
      done();
    });

    it('should call DefaultMessage if handleMessage cannot parse multipart', async done => {
      await handleMessage('random-string');
      expect(DefaultMessage.prototype.handleMessage).toHaveBeenCalledTimes(1);
      expect(DefaultMessage.prototype.handleMessage).toHaveBeenCalledWith('random-string');
      done();
    });

    it('should call DefaultMessage if parse multipart throws error', async done => {
      parseMultipartBody.mockImplementation(() => new Error('error'));
      await handleMessage('message');
      expect(DefaultMessage.prototype.handleMessage).toHaveBeenCalledTimes(1);
      expect(DefaultMessage.prototype.handleMessage).toHaveBeenCalledWith('message');
      done();
    });

    it('should call DefaultMessage if the message action does not have a handler implemented', async done => {
      await handleMessage(unhandledInteractionId);
      expect(DefaultMessage.prototype.handleMessage).toHaveBeenCalledTimes(1);
      expect(DefaultMessage.prototype.handleMessage).toHaveBeenCalledWith(unhandledInteractionId);
      done();
    });

    it('should call logInfo with status of "Extracting Action from Message"', async done => {
      await handleMessage(unhandledInteractionId);
      expect(logInfo).toHaveBeenCalledWith('Extracting Action from Message', expect.anything());
      done();
    });

    it('should call logInfo with the multipart message headers', async done => {
      await handleMessage(unhandledInteractionId);
      const multipartMessage = await parseMultipartBody(unhandledInteractionId);
      expect(logInfo).toHaveBeenCalledWith(
        'Extracting Action from Message',
        expect.objectContaining({
          messageHeaders: multipartMessage.map(message => message.headers || 'unknown')
        })
      );
      done();
    });

    it('should call logError when action cannot be found', async done => {
      await handleMessage('random-string');
      expect(logError).toHaveBeenCalled();
      done();
    });

    it('should logInfo with the correct interactionId', async done => {
      await handleMessage('anything');
      expect(logInfo).toHaveBeenCalledWith(`interactionId: undefined`);
      done();
    });
  });
});
