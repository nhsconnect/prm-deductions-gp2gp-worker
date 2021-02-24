import { addQueueContext } from '../../../config/logging';
import { handleMessage } from './';
import { createLogger } from 'winston';

export const subscriberOnMessageCallback = (channel, message) => async (err, body) => {
  let logger = createLogger();
  logger = addQueueContext(
    logger,
    message.headers['correlation-id'],
    message.headers['destination']
  );
  logger.info('Handling Message');

  if (err) {
    logger.error('SubscriberOnMessageCallback error', { err });
    return;
  }

  try {
    await handleMessage(body);
  } catch (err) {
    logger.error('Unsuccessful message handling', { err });
  }
};
