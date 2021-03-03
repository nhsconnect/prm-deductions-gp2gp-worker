import axios from 'axios';
import { initializeConfig } from '../../config';
import { logInfo, logError } from '../../config/logging';

export const confirmMessageStored = async body => {
  const config = initializeConfig();
  try {
    const requestBody = {
      data: {
        type: 'messages',
        id: body.messageId,
        attributes: {
          conversationId: body.conversationId,
          messageType: 'ehrExtract',
          nhsNumber: body.nhsNumber,
          attachmentMessageIds: []
        }
      }
    };
    await axios.post(`${config.ehrRepoUrl}/messages`, requestBody, {
      headers: { Authorization: `${config.ehrRepoAuthKeys}` }
    });
    logInfo('confirmMessageStored success', { ehrRepository: { transferSuccessful: true } });
  } catch (err) {
    logError('failed to update transfer complete to ehr repo api', {
      error: err
    });
    throw err;
  }
};
