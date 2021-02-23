import cloneDeep from 'lodash.clonedeep';
import traverse from 'traverse';
import { createLogger, format, transports } from 'winston';
import { initializeConfig } from './index';

const OBFUSCATED_VALUE = '********';
const SECRET_KEYS = ['passcode', 'data', 'authorization'];

export const obfuscateSecrets = format(info => {
  const updated = cloneDeep(info);
  traverse(updated).forEach(function () {
    if (SECRET_KEYS.includes(this.key)) this.update(OBFUSCATED_VALUE);
  });
  return updated;
});

export const addCommonFields = format(info => {
  const { nhsEnvironment } = initializeConfig();
  const updated = cloneDeep(info);
  updated['service'] = 'gp2gp-worker';
  updated['environment'] = nhsEnvironment;
  return updated;
});

const loggingLevels = {
  levels: {
    DEBUG: 0,
    INFO: 1,
    WARN: 2,
    ERROR: 3
  },
  colors: {
    DEBUG: 'blue',
    INFO: 'green',
    WARN: 'yellow',
    ERROR: 'red'
  }
};

export const options = {
  format: format.combine(obfuscateSecrets(), addCommonFields(), format.timestamp(), format.json()),
  transports: [new transports.Console({ handleExceptions: true })],
  levels: loggingLevels.levels,
  colors: loggingLevels.colors
};

export const genericLogger = createLogger(options);
export const queueLogger = createLogger(, ...options);
export const httpLogger = createLogger(, ...options);


export const createQueueLogger = (correlationId) => {
  const options = {
    format: format.combine(obfuscateSecrets(), addCommonFields(), addCorrelationId(correlationId), format.timestamp(), format.json()),
    transports: [new transports.Console({ handleExceptions: true })],
    levels: loggingLevels.levels,
    colors: loggingLevels.colors
  };
  return createLogger(options)
};