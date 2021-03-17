import { subscriberOnMessageCallback } from './subscriber-on-message-callback';
import { logInfo, logError } from '../../../config/logging';

export const subscriberReadMessageCallback = channel => (err, messageStream) => {
  logInfo('Subscriber has Received Message');
  if (err) {
    logError(err);
    return;
  }

  messageStream.readString('UTF-8', subscriberOnMessageCallback(channel, messageStream));
};
