import axios from 'axios';
import { initializeConfig } from '../../config';
import { logInfo } from '../../config/logging';

export const sendPdsUpdate = async conversationId => {
  const config = initializeConfig();
  try {
    const url = `${config.gpToRepoUrl}/deduction-requests/${conversationId}/pds-updated`;
    return await axios.patch(url, {}, { headers: { Authorization: `${config.gpToRepoAuthKeys}` } });
  } catch (err) {
    logInfo('failed to send PATCH request with PDS Update', { error: err.stack });
    throw err;
  }
};
