import { logger } from '../../../config/logging';
import { handleMessage } from './';

export const subscriberOnMessageCallback = (channel, message) => async (err, body) => {
  logger.log('INFO', 'Handling Message', {
    CorrelationId: message.headers['correlation-id'],
    Queue: message.headers['destination']
  });

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
