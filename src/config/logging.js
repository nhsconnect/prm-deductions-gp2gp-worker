import cloneDeep from 'lodash.clonedeep';
import traverse from 'traverse';
import { createLogger, format, transports } from 'winston';
import { initializeConfig } from './index';

// eslint-disable-next-line no-unused-vars
export const addQueueFields = format((info, { correlationId, queue }) => {
  const updated = cloneDeep(info);
  updated['correlationId'] = correlationId;
  updated['queueName'] = queue;
  return updated;
});

export const obfuscateSecrets = format(info => {
  const SECRET_KEYS = ['passcode', 'data', 'authorization'];
  const OBFUSCATED_VALUE = '********';

  const updated = cloneDeep(info);
  traverse(updated).forEach(function () {
    if (SECRET_KEYS.includes(this.key)) this.update(OBFUSCATED_VALUE);
  });
  return updated;
});

const addCommonFields = format(info => {
  const { nhsEnvironment } = initializeConfig();
  const updated = cloneDeep(info);
  updated.level = updated.level.toUpperCase();
  updated['service'] = 'gp2gp-worker';
  updated['environment'] = nhsEnvironment;
  return updated;
});

export const options = {
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    obfuscateSecrets(),
    addCommonFields(),
    format.json()
  ),
  transports: [new transports.Console({ handleExceptions: true })]
};

export const logger = createLogger(options);

export const logError = (status, error) => logger.error(status, { error: error.message });
export const logWarning = status => logger.warn(status);
export const logInfo = status => logger.info(status);
export const logDebug = status => logger.debug(status);
