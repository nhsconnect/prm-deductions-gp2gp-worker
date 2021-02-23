import cloneDeep from 'lodash.clonedeep';
import traverse from 'traverse';
import { createLogger, format, transports } from 'winston';
import { initializeConfig } from './index';

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

export const obfuscateSecrets = format(info => {
  const OBFUSCATED_VALUE = '********';
  const SECRET_KEYS = ['passcode', 'data', 'authorization'];

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

export const addQueueFields = (correlationId, queue) =>
  format(info => {
    const updated = cloneDeep(info);
    updated['correlationId'] = correlationId;
    updated['queue'] = queue;
    return updated;
  });

export const addMessageAndConversationIds = (messageId, conversationId) =>
  format(info => {
    const updated = cloneDeep(info);
    updated['conversationId'] = conversationId;
    updated['messageId'] = messageId;
    return updated;
  });

export const addHttpFields = (statusCode, method) =>
  format(info => {
    const updated = cloneDeep(info);
    updated['statusCode'] = statusCode;
    updated['method'] = method;
    return updated;
  });

export const genericOptions = {
  format: format.combine(obfuscateSecrets(), addCommonFields(), format.timestamp(), format.json()),
  transports: [new transports.Console({ handleExceptions: true })],
  levels: loggingLevels.levels,
  colors: loggingLevels.colors
};

export const genericLogger = createLogger(genericOptions);

export const createQueueLogger = (correlationId, queue, genericOptions) => {
  const options = {
    format: format.combine(addQueueFields(correlationId, queue)),
    ...genericOptions
  };
  return createLogger(options);
};

export const createMessageLogger = (messageId, conversationId, genericOptions) => {
  const options = {
    format: format.combine(addMessageAndConversationIds(messageId, conversationId)),
    ...genericOptions
  };
  return createLogger(options);
};

export const createHttpLogger = (statusCode, method, genericOptions) => {
  const options = {
    format: format.combine(addHttpFields(statusCode, method)),
    ...genericOptions
  };
  return createLogger(options);
};
