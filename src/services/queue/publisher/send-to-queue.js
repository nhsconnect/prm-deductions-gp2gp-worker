import { logger } from '../../../config/logging';
import { initializeConfig } from '../../../config';
import { channelPool } from '../helper';

export const sendToQueue = (message, options = {}) => {
  const config = initializeConfig();

  return new Promise((resolve, reject) => {
    logger.log('INFO', 'Sending Message to Queue');

    channelPool.channel((error, channel) => {
      if (error) {
        logger.log('ERROR', 'sendToQueue error', error);
        reject(error);
      }

      const transaction = channel.begin({
        destination: config.queueName,
        ...options
      });

      transaction.send(
        {
          destination: config.queueName,
          ...options
        },
        message
      );

      transaction.commit(err => {
        if (err) {
          logger.log('ERROR', err);
          transaction.abort();
          reject(err);
        }

        logger.log('INFO', 'Sent Message Successfully');
        channel.close();
        resolve();
      });
    });
  });
};
