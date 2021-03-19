import { logError, logInfo } from '../../../config/logging';
import { endCurrentSpan } from '../../../config/tracing';
import { handleMessage } from './';

export const subscriberOnMessageCallback = (channel, message) => async (err, body) => {
  logInfo('Handling Message', { queue: { messageId: message.id } });

  if (err) {
    logError('subscriberOnMessageCallback error', { err });
    return;
  }

  try {
    await handleMessage(body);
  } catch (err) {
    logError('Handling Message error', { err });
  }

  endCurrentSpan();
};
