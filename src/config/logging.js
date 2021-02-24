import cloneDeep from 'lodash.clonedeep';
import traverse from 'traverse';
import { createLogger, format, transports } from 'winston';
import { initializeConfig } from './index';

// export const loggingLevels = {
//   DEBUG: 0,
//   INFO: 1,
//   WARN: 2,
//   ERROR: 3
// };

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

// eslint-disable-next-line no-unused-vars
export const addQueueFields = format((info, { correlationId, queue }) => {
  const updated = cloneDeep(info);
  updated['correlationId'] = correlationId;
  updated['queueName'] = queue;
  return updated;
});

export const addMessageAndConversationIds = format((info, { messageId, conversationId }) => {
  const updated = cloneDeep(info);
  updated['conversationId'] = messageId;
  updated['messageId'] = conversationId;
  return updated;
});

export const addHttpFields = format((info, { method, statusCode }) => {
  const updated = cloneDeep(info);
  updated['method'] = method;
  updated['statusCode'] = statusCode;
  return updated;
});

const commonOptions = [obfuscateSecrets(), addCommonFields(), format.timestamp(), format.json()];

export const genericOptions = {
  format: format.combine(...commonOptions),
  transports: [new transports.Console({ handleExceptions: true })]
};
export const logger = createLogger(genericOptions);

export const addQueueContext = (correlationId, queue) => {
  const enhancedFormat = format.combine(addQueueFields({ correlationId, queue }), ...commonOptions);
  const options = {
    ...genericOptions,
    format: enhancedFormat
  };
  return createLogger(options);
};

// eslint-disable-next-line no-unused-vars
// export const createQueueLogger = (correlationId, queue) => {
//   const options = {
//     ...genericOptions,
//     format: format.combine(
//       obfuscateSecrets(),
//       addQueueFields({ correlationId, queue }),
//       format.timestamp(),
//       format.json()
//     )
//
//     format.combine(format.combine(
//         obfuscateSecrets())
//         format.timestamp(),
//         format.json()
//     ), addQueueFields({ correlationId, queue }))
//   };
//   return createLogger(options);
// };
export const createMessageLogger = (messageId, conversationId) => {
  const options = {
    ...genericOptions,
    format: format.combine(
      obfuscateSecrets(),
      addMessageAndConversationIds({ messageId, conversationId }),
      format.timestamp(),
      format.json()
    )
  };
  return createLogger(options);
};

export const createHttpLogger = (statusCode, method) => {
  const options = {
    ...genericOptions,
    format: format.combine(
      obfuscateSecrets(),
      addHttpFields({ statusCode, method }),
      format.timestamp(),
      format.json()
    )
  };
  return createLogger(options);
};
