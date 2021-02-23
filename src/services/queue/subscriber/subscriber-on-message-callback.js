import { logError, logEvent } from '../../../middleware/logging';
import { logger } from '../../../config/logging';
import { handleMessage } from './';

export const subscriberOnMessageCallback = (channel, message) => async (err, body) => {
  logEvent('Handling Message', { messageId: message.id });
  logger.info('Handling Message with Msg Id', {
    msgId: message.headers['message-id']
  });
  logger.info('Handling Message with headers', { headers: message.headers });
  if (err) {
    logError('subscriberOnMessageCallback error', { err });
    return;
  }

  try {
    await handleMessage(body);
  } catch (err) {
    logError('Handling Message error', { err });
  }
};
