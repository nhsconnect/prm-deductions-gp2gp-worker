import axios from 'axios';
import { initializeConfig } from '../../config';
import { logger } from '../../config/logging';

export const sendEhrRequest = async (nhsNumber, conversationId, odsCode, ehrRequestId) => {
  const config = initializeConfig();
  const url = `${config.repoToGpUrl}/registration-requests/`;
  const body = {
    data: {
      type: 'registration-requests',
      id: conversationId,
      attributes: {
        nhsNumber,
        odsCode,
        ehrRequestId
      }
    }
  };
  const headers = { headers: { Authorization: config.repoToGpAuthKeys } };

  try {
    await axios.post(url, body, headers);
    logger.log('INFO', `EHR Request successfully sent to repo-to-gp`);
  } catch (err) {
    logger.log('ERROR', `Cannot send EHR request to repo-to-gp: ${err.message}`);
    throw err;
  }
};
