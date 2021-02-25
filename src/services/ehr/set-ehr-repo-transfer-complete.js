import axios from 'axios';
import { initializeConfig } from '../../config';
import { logInfo, logError } from '../../config/logging';

export const setTransferComplete = async body => {
  const config = initializeConfig();
  try {
    if (config.useNewEhrRepoApi) {
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
    } else {
      await axios.patch(
        `${config.ehrRepoUrl}/fragments`,
        {
          conversationId: body.conversationId,
          transferComplete: true
        },
        { headers: { Authorization: `${config.ehrRepoAuthKeys}` } }
      );
    }
    logInfo('setTransferComplete success', { ehrRepository: { transferSuccessful: true } });
  } catch (err) {
    logError('failed to update transfer complete to ehr repo api', {
      error: err
    });
    throw err;
  }
};
