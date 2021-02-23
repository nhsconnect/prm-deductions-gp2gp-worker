import axios from 'axios';
import { initializeConfig } from '../../config';
import { logger } from '../../config/logging';

export const fetchStorageUrl = async body => {
  const config = initializeConfig();
  try {
    return await axios.post(
      `${config.ehrRepoUrl}/fragments`,
      { ...body, isLargeMessage: false },
      {
        headers: { Authorization: `${config.ehrRepoAuthKeys}` }
      }
    );
  } catch (err) {
    logger.ERROR('failed to get pre-signed url', { error: err.stack });
    throw err;
  }
};
