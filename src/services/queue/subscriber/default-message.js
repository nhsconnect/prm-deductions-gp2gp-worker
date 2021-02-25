import { initializeConfig } from '../../../config';
import { logInfo } from '../../../config/logging';
import { sendToQueue } from '../publisher';

class DefaultMessage {
  constructor() {
    this.name = 'Unhandled Message';
    this.interactionId = 'Undefined';
    this.config = initializeConfig();
  }

  handleMessage(message) {
    logInfo(`Redirecting Message to ${this.config.unhandledMessagesQueueName}`, {
      parser: { name: this.name, interactionId: this.interactionId }
    });
    return sendToQueue(message, { destination: this.config.unhandledMessagesQueueName });
  }
}

export { DefaultMessage };
