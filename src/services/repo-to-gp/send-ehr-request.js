import axios from 'axios';
import { initializeConfig } from '../../config';
import { logError, logInfo } from '../../config/logging';
import { getTraceParentFromCurrentSpan } from '../../config/tracing';

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
  const traceParent = getTraceParentFromCurrentSpan();
  const headers = { Authorization: config.repoToGpAuthKeys, traceparent: traceParent };

  try {
    await axios.post(url, body, { headers });
    logInfo(`EHR Request successfully sent to repo-to-gp`);
  } catch (err) {
    logError(`Cannot send EHR request to repo-to-gp: ${err.message}`);
    throw err;
  }
};
