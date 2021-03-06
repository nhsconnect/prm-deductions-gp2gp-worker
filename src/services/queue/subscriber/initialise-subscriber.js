import { initializeConfig } from '../../../config';
import { logError, logInfo } from '../../../config/logging';
import { channelPool } from '../helper';
import { subscriberReadMessageCallback } from './subscriber-read-message-callback';

export const initialiseSubscriber = (options = {}) => {
  const config = initializeConfig();

  return new Promise((resolve, reject) => {
    channelPool.channel((err, channel) => {
      if (err) {
        logError('initialiseSubscriber error', err);
        reject(err);
      }

      const subscribeParams = {
        destination: config.queueName,
        ack: 'auto',
        ...options
      };

      logInfo('Initialising Subscriber', {
        queue: subscribeParams
      });

      channel.subscribe(subscribeParams, subscriberReadMessageCallback(channel));

      resolve(channel);
    });
  });
};
