import axios from 'axios';
import { initializeConfig } from '../../../config';
import { confirmMessageStored } from '../confirm-message-stored';
import { v4 } from 'uuid';

jest.mock('axios');
jest.mock('../../../config');
jest.mock('../../../config/logging');

describe('confirmMessageStored', () => {
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
      ehrRepoAuthKeys: mockAuthKeys
    });
  });

  it('should make a call to ehr storage endpoint with conversation ID and message', async done => {
    await confirmMessageStored(body);
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith(`${mockEhrRepoUrl}/messages`, requestBody, axiosConfig);
    done();
  });
});
