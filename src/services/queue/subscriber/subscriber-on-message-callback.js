import { logError } from '../../../middleware/logging';
import { logger } from '../../../config/logging';
import { handleMessage } from './';

// eslint-disable-next-line no-unused-vars
export const subscriberOnMessageCallback = (channel, message) => async (err, body) => {
  logger.info('Handling Message', { messageId: message.id });
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
