import axios from 'axios';
import { initializeConfig } from '../../../config';
import { logError } from '../../../config/logging';
import { setTransferComplete } from '../set-ehr-repo-transfer-complete';
import { v4 } from 'uuid';

jest.mock('axios');
jest.mock('../../../config');
jest.mock('../../../config/logging');

describe('setTransferComplete', () => {
  describe('uses old ehr repo api', () => {
    const conversationId = v4();
    const body = { conversationId };
    const mockEhrRepoUrl = 'https://ehr-repo-url';
    const mockAuthKeys = 'auth';
    const axiosConfig = { headers: { Authorization: mockAuthKeys } };

    beforeEach(() => {
      axios.patch.mockResolvedValue({ data: 'some-url' });
      initializeConfig.mockReturnValue({
        ehrRepoUrl: mockEhrRepoUrl,
        ehrRepoAuthKeys: mockAuthKeys,
        useNewEhrRepoApi: false
      });
    });

    it('should make a call to ehr storage endpoint with conversation ID and message', async done => {
      await setTransferComplete(body);
      expect(axios.patch).toHaveBeenCalledTimes(1);
      expect(axios.patch).toHaveBeenCalledWith(
        `${mockEhrRepoUrl}/fragments`,
        expect.objectContaining({
          conversationId,
          transferComplete: true
        }),
        axiosConfig
      );
      done();
    });

    it('should throw an error if axios.patch throws', () => {
      axios.patch.mockImplementation(() => {
        throw new Error('some-error');
      });
      return expect(setTransferComplete(body)).rejects.toEqual(Error('some-error'));
    });

    it('should call logError with the error if axios.patch throws', async done => {
      axios.patch.mockImplementation(() => {
        throw new Error('some-error');
      });
      await setTransferComplete(body).catch(() => {});
      expect(logError).toHaveBeenCalledTimes(1);
      expect(logError).toHaveBeenCalledWith(
        'failed to update transfer complete to ehr repo api',
        expect.anything()
      );
      done();
    });
  });

  describe('uses new ehr repo api', () => {
    const conversationId = v4();
    const messageId = v4();
    const nhsNumber = '1234567890';
    const mockEhrRepoUrl = 'https://ehr-repo-url';
    const mockAuthKeys = 'auth';
    const body = { conversationId, nhsNumber, messageId };
    const axiosConfig = { headers: { Authorization: mockAuthKeys } };
    const requestBody = {
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
      axios.patch.mockResolvedValue({ data: 'some-url' });
      initializeConfig.mockReturnValue({
        ehrRepoUrl: mockEhrRepoUrl,
        ehrRepoAuthKeys: mockAuthKeys,
        useNewEhrRepoApi: true
      });
    });

    it('should make a call to ehr storage endpoint with conversation ID and message', async done => {
      await setTransferComplete(body);
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        `${mockEhrRepoUrl}/messages`,
        requestBody,
        axiosConfig
      );
      done();
    });
  });
});
