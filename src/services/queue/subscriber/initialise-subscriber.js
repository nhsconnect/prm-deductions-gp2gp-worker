import { initializeConfig } from '../../../config';
import { logger } from '../../../config/logging';
import { channelPool } from '../helper';
import { subscriberReadMessageCallback } from './subscriber-read-message-callback';

export const initialiseSubscriber = (options = {}) => {
  const config = initializeConfig();

  return new Promise((resolve, reject) => {
    channelPool.channel((err, channel) => {
      if (err) {
        logger.log('ERROR', 'initialiseSubscriber error', err);
        reject(err);
      }

      const subscribeParams = {
        destination: config.queueName,
        ack: 'auto',
        ...options
      };

      logger.log('INFO', 'Initialising Subscriber', {
        queue: subscribeParams
      });

      channel.subscribe(subscribeParams, subscriberReadMessageCallback(subscribeParams, channel));

      resolve(channel);
    });
  });
};
