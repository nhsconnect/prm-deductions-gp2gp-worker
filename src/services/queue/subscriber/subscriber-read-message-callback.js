import { subscriberOnMessageCallback } from './subscriber-on-message-callback';
import { logEvent, logError } from '../../../middleware/logging';
import { logger } from '../../../config/logging';

export const subscriberReadMessageCallback = (subscriberParams, channel) => (
  err,
  messageStream
) => {
  // logEvent('Subscriber has Received Message');
  logger.log('INFO', 'Subscriber has Received Message', { Queue: subscriberParams.destination });

  if (err) {
    logger.log('ERROR', 'Subscriber has not Received a Message');

    // logError(err);
    return;
  }

  messageStream.readString(
    'UTF-8',
    subscriberOnMessageCallback(channel, messageStream, subscriberParams)
  );
};
