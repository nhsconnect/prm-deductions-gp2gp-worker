import { ConnectFailover } from 'stompit';
import { getStompitQueueConfig } from '../../../config/utils';
import { logger } from '../../../config/logging';

export const getQueueConnections = () => {
  const connections = new ConnectFailover(getStompitQueueConfig(), {
    maxReconnects: 1,
    initialReconnectDelay: 100
  });

  connections.on('connecting', connector => {
    logger.log('INFO', 'Connecting to Queue', {
      queue: {
        transportPath: connector.serverProperties.remoteAddress.transportPath
      }
    });
  });

  connections.on('error', err => {
    logError(`Connection.onError: ${err.message}`);
  });

  return connections;
};
