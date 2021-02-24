import { initializeConfig } from '../../../config';
// import { logError, logEvent } from '../../../middleware/logging';
import { channelPool } from '../helper';
import { subscriberReadMessageCallback } from './subscriber-read-message-callback';
import { logger, addQueueContext } from '../../../config/logging';
// import { createLogger } from 'winston';

export const initialiseSubscriber = (options = {}) => {
  const config = initializeConfig();
  // let qlogger = logger;
  // logger = addQueueContext(, '123', 'queue');

  return new Promise((resolve, reject) => {
    channelPool.channel((err, channel) => {
      // if (err) {
      //   logger.error('initialiseSubscriber error', err);
      //   reject(err);
      // }
      // logger = addCorrelationId(logger, '1234');
      // const queueLogger = createQueueLogger('1234', 'queue');
      const qlogger = addQueueContext('123', 'queue');
      // logger = addQueueName('name');
      const subscribeParams = {
        destination: config.queueName,
        ack: 'auto',
        ...options
      };

      qlogger.info('Initialising Subscriber', {
        queue: subscribeParams
      });

      channel.subscribe(subscribeParams, subscriberReadMessageCallback(channel));

      resolve(channel);
    });
  });
};
