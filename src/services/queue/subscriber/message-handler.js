import { logInfo, logError } from '../../../config/logging';
import { parseMultipartBody } from '../../parser';
import { extractAction } from '../../parser/soap';
import { DefaultMessage } from './';

export const handleMessage = async message => {
  let interactionId;

  try {
    const multipartMessage = parseMultipartBody(message);
    logInfo('Extracting Action from Message', {
      messageHeaders: multipartMessage.map(message => message.headers || 'unknown')
    });
    interactionId = await extractAction(multipartMessage[0].body);
  } catch (err) {
    logError('parseMultipartBody error', err);
    interactionId = 'undefined';
  }

  logInfo(`interactionId: ${interactionId}`);

  let handler;

  switch (interactionId) {
    default:
      handler = new DefaultMessage();
  }

  return handler.handleMessage(message);
};
