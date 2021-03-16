import axios from 'axios';
import { initializeConfig } from '../../config';
import { logInfo, logError } from '../../config/logging';
import { getTraceParentFromCurrentSpan } from '../../config/tracing';

export const sendPdsUpdate = async conversationId => {
  const config = initializeConfig();
  const traceParent = getTraceParentFromCurrentSpan();
  const headers = { Authorization: config.gpToRepoAuthKeys, traceparent: traceParent };

  try {
    const url = `${config.gpToRepoUrl}/deduction-requests/${conversationId}/pds-updated`;
    logInfo('Successfully sent PATCH request with PDS Update');

    return await axios.patch(url, {}, { headers });
  } catch (err) {
    logError('Failed to send PATCH request with PDS Update', { error: err.stack });
    throw err;
  }
};
