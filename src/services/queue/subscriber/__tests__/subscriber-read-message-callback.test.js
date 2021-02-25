import { mockChannel, mockMessageStream } from '../../../../__mocks__/stompit';
import { subscriberReadMessageCallback } from '../subscriber-read-message-callback';
import { logInfo, logError } from '../../../../config/logging';

jest.mock('async-local-storage');
jest.mock('../../../../config/logging');
jest.mock('../subscriber-on-message-callback');

const mockError = 'mock-error';
const mockCallback = subscriberReadMessageCallback(mockChannel);

describe('subscriberReadMessageCallback', () => {
  describe('on success', () => {
    beforeEach(async () => {
      await mockCallback(false, mockMessageStream);
    });

    it('should call logInfo', () => {
      expect(logInfo).toHaveBeenCalledTimes(1);
      expect(logInfo).toHaveBeenCalledWith('Subscriber has Received Message');
    });

    it('should set the readString with callback', () => {
      expect(mockMessageStream.readString).toHaveBeenCalledTimes(1);
      expect(mockMessageStream.readString).toHaveBeenCalledWith('UTF-8', expect.any(Function));
    });
  });

  describe('on error', () => {
    beforeEach(async () => {
      await mockCallback(mockError, mockMessageStream);
    });

    it('should call logInfo', () => {
      expect(logInfo).toHaveBeenCalledTimes(1);
      expect(logInfo).toHaveBeenCalledWith('Subscriber has Received Message');
    });

    it('should call logError', () => {
      expect(logError).toHaveBeenCalledTimes(1);
    });
  });
});
