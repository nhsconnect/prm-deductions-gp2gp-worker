import { context, getSpan } from '@opentelemetry/api';
import { logError, logInfo } from '../../../config/logging';
import { handleMessage } from './';

export const subscriberOnMessageCallback = (channel, message) => async (err, body) => {
  const currentSpan = getSpan(context.active());
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

  currentSpan.end();
};
