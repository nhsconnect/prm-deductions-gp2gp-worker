import axios from 'axios';
import { v4 } from 'uuid';
import { initializeConfig } from '../../../config';
import { logError } from '../../../config/logging';
import { fetchStorageUrl } from '../fetch-ehr-repo-storage-url';

jest.mock('axios');
jest.mock('../../../config');
jest.mock('../../../config/logging');

describe('fetchStorageUrl', () => {
  describe('fetchStorageUrl using new ehr repo api', () => {
    const conversationId = v4();
    const messageId = v4();
    const body = { conversationId, messageId };
    const mockEhrRepoUrl = 'https://ehr-repo-url';
    const mockAuthKeys = 'auth';
    const presignedUrl = 'some-url';
    const axiosConfig = { headers: { Authorization: mockAuthKeys } };

    beforeEach(() => {
      axios.get.mockResolvedValue({ status: 200, data: presignedUrl });
      initializeConfig.mockReturnValue({
        ehrRepoUrl: mockEhrRepoUrl,
        ehrRepoAuthKeys: mockAuthKeys
      });
    });

    it('should make a call fetch url with soap message and isLargeMessage', async done => {
      const response = await fetchStorageUrl(body);
      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `${mockEhrRepoUrl}/messages/${conversationId}/${messageId}`,
        axiosConfig
      );

      expect(response).toEqual({ data: presignedUrl });
      done();
    });

    it('should call logError if axios.get throws', async done => {
      axios.get.mockImplementation(() => {
        throw new Error('some-error');
      });
      await fetchStorageUrl(body).catch(() => {});
      expect(logError).toHaveBeenCalledTimes(1);
      expect(logError).toHaveBeenCalledWith('failed to get pre-signed url', expect.anything());
      done();
    });
  });
});
