import axios from 'axios';
import { initializeConfig } from '../../config';
import { logError } from '../../config/logging';
import { getTraceParentFromCurrentSpan } from '../../config/tracing';

export const sendEhrMessageReceived = async (conversationId, messageId) => {
  const config = initializeConfig();
  const url = `${config.gpToRepoUrl}/deduction-requests/${conversationId}/ehr-message-received`;
  const traceParent = getTraceParentFromCurrentSpan();
  const headers = { Authorization: config.gpToRepoAuthKeys, traceparent: traceParent };

  try {
    return await axios.patch(url, { messageId }, { headers });
  } catch (err) {
    const errorMessage = `PATCH ${url} - ${err.message || 'Request failed'}`;
    const axiosError = new Error(errorMessage);
    logError(errorMessage, err);
    throw axiosError;
  }
};
