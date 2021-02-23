import { createQueueLogger } from '../../../config/logging';
import { handleMessage } from './';

export const subscriberOnMessageCallback = (channel, message) => async (err, body) => {
  const logger = createQueueLogger(message.headers['correlation-id'], message.headers['destination']);
  logger.INFO('Handling Message');

  if (err) {
    logger.log('ERROR', 'subscriberOnMessageCallback error', { err });
    return;
  }

  try {
    await handleMessage(body);
  } catch (err) {
    logger.log('ERROR', 'Unsuccessful message handling', { err });
  }
};
