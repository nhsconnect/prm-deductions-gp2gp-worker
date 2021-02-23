import { subscriberOnMessageCallback } from './subscriber-on-message-callback';
import { logger } from '../../../config/logging';

export const subscriberReadMessageCallback = (subscriberParams, channel) => (
  err,
  messageStream
) => {
  logger.log('INFO', 'Subscriber has Received Message', { Queue: subscriberParams.destination });

  if (err) {
    logger.log('ERROR', 'Subscriber has not Received a Message');

    return;
  }

  messageStream.readString(
    'UTF-8',
    subscriberOnMessageCallback(channel, messageStream, subscriberParams)
  );
};
