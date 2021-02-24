import { initializeConfig } from '../../../config';
import { channelPool } from '../helper';
import { subscriberReadMessageCallback } from './subscriber-read-message-callback';
import { logger, addQueueContext } from '../../../config/logging';

export const initialiseSubscriber = (options = {}) => {
  const config = initializeConfig();
  let queueLogger = logger;
  return new Promise((resolve, reject) => {
    channelPool.channel((err, channel) => {
      if (err) {
        queueLogger.error('initialiseSubscriber error', err);
        reject(err);
      }
      const subscribeParams = {
        destination: config.queueName,
        ack: 'auto',
        ...options
      };
      console.log(subscribeParams, 'subscribeParams');
      queueLogger = addQueueContext('123', subscribeParams.destination || 'local');
      queueLogger.info('Initialising Subscriber');

      channel.subscribe(subscribeParams, subscriberReadMessageCallback(channel));

      resolve(channel);
    });
  });
};
