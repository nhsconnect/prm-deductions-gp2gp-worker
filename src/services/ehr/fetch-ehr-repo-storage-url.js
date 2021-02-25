import axios from 'axios';
import { initializeConfig } from '../../config';
import { logError } from '../../config/logging';

export const fetchStorageUrl = async body => {
  const config = initializeConfig();
  try {
    if (config.useNewEhrRepoApi) {
      const { messageId, conversationId } = body;
      const response = await axios.get(
        `${config.ehrRepoUrl}/messages/${conversationId}/${messageId}`,
        {
          headers: { Authorization: `${config.ehrRepoAuthKeys}` }
        }
      );
      return { data: response.data };
    } else {
      return await axios.post(
        `${config.ehrRepoUrl}/fragments`,
        { ...body, isLargeMessage: false },
        {
          headers: { Authorization: `${config.ehrRepoAuthKeys}` }
        }
      );
    }
  } catch (err) {
    logError('failed to get pre-signed url', { error: err.stack });
    throw err;
  }
};
