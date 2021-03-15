import axios from 'axios';
import { initializeConfig } from '../../config';
import { logInfo, logError } from '../../config/logging';

export const sendPdsUpdate = async conversationId => {
  const config = initializeConfig();
  try {
    const url = `${config.gpToRepoUrl}/deduction-requests/${conversationId}/pds-updated`;
    logInfo('Successfully sent PATCH request with PDS Update');

    return await axios.patch(url, {}, { headers: { Authorization: `${config.gpToRepoAuthKeys}` } });
  } catch (err) {
    logError('Failed to send PATCH request with PDS Update', { error: err.stack });
    throw err;
  }
};
