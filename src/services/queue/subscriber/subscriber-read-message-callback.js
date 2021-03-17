import { context, setSpan } from '@opentelemetry/api';
import { subscriberOnMessageCallback } from './subscriber-on-message-callback';
import { logInfo, logError } from '../../../config/logging';
import { tracer } from '../../../config/tracing';

export const subscriberReadMessageCallback = channel => (err, messageStream) => {
  const messageSpan = tracer.startSpan('messageSpan', context.active());
  context.with(setSpan(context.active(), messageSpan), () => {
    logInfo('Subscriber has Received Message');
    if (err) {
      logError(err);
      return;
    }

    messageStream.readString('UTF-8', subscriberOnMessageCallback(channel, messageStream));
  });
  messageSpan.end();
};
