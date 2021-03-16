import axios from 'axios';
import { initializeConfig } from '../../config';
import { logError } from '../../config/logging';
import { getTraceParentFromCurrentSpan } from '../../config/tracing';

export const fetchStorageUrl = async body => {
  const config = initializeConfig();
  try {
    const traceParent = getTraceParentFromCurrentSpan();
    const headers = { Authorization: config.ehrRepoAuthKeys, traceparent: traceParent };
    const { messageId, conversationId } = body;

    const response = await axios.get(
      `${config.ehrRepoUrl}/messages/${conversationId}/${messageId}`,
      { headers }
    );
    return { data: response.data };
  } catch (err) {
    logError('failed to get pre-signed url', { error: err.stack });
    throw err;
  }
};
