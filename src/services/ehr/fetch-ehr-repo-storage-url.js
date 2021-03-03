import axios from 'axios';
import { initializeConfig } from '../../config';
import { logError } from '../../config/logging';

export const fetchStorageUrl = async body => {
  const config = initializeConfig();
  try {
    const { messageId, conversationId } = body;
    const response = await axios.get(
      `${config.ehrRepoUrl}/messages/${conversationId}/${messageId}`,
      {
        headers: { Authorization: `${config.ehrRepoAuthKeys}` }
      }
    );
    return { data: response.data };
  } catch (err) {
    logError('failed to get pre-signed url', { error: err.stack });
    throw err;
  }
};
