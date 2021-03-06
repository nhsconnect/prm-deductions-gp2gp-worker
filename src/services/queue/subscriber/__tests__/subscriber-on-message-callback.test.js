import { logInfo, logError } from '../../../../config/logging';
import { mockChannel } from '../../../../__mocks__/stompit';
import { handleMessage } from '../message-handler';
import { subscriberOnMessageCallback } from '../subscriber-on-message-callback';

jest.mock('../message-handler');
jest.mock('../../../../config/logging');

const mockMessage = 'mock-message';
const mockBody = 'mock-body';
const mockError = 'mock-error';
const callback = subscriberOnMessageCallback(mockChannel, mockMessage);

describe('subscriberOnMessageCallback', () => {
  describe('on success', () => {
    beforeEach(async () => {
      handleMessage.mockResolvedValue();
      await callback(false, mockBody);
    });

    it('should call logInfo status on success with "Handling Message"', () => {
      expect(logInfo).toHaveBeenCalledWith('Handling Message', expect.anything());
    });
  });

  describe('if error in callback', () => {
    beforeEach(async () => {
      handleMessage.mockResolvedValue();
      await callback(mockError);
    });

    it('should call logInfo status on error with "Handling Message"', () => {
      expect(logInfo).toHaveBeenCalledWith('Handling Message', expect.anything());
    });

    it('should call logError with the error', () => {
      expect(logError).toHaveBeenCalledTimes(1);
      expect(logError).toHaveBeenCalledWith('subscriberOnMessageCallback error', {
        err: 'mock-error'
      });
    });

    it('should return from callback', async () => {
      expect(handleMessage).toHaveBeenCalledTimes(0);
    });
  });

  describe('handleMessage throws error', () => {
    beforeEach(async () => {
      handleMessage.mockRejectedValue(mockError);
      await callback(false, mockBody);
    });

    it('should call logError with the error', () => {
      expect(logError).toHaveBeenCalledTimes(1);
      expect(logError).toHaveBeenCalledWith('Handling Message error', { err: 'mock-error' });
    });
  });
});
