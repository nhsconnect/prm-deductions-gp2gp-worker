import axios from 'axios';
import { initializeConfig } from '../../config';
import { logger } from '../../config/logging';

export const setTransferComplete = async body => {
  const config = initializeConfig();
  try {
    const response = await axios.patch(
      `${config.ehrRepoUrl}/fragments`,
      {
        conversationId: body.conversationId,
        transferComplete: true
      },
      { headers: { Authorization: `${config.ehrRepoAuthKeys}` } }
    );
    logger.log('INFO', 'setTransferComplete success', { ehrRepository: { transferSuccessful: true } });
    return response;
  } catch (err) {
    logger.log('ERROR', 'failed to update transfer complete to ehr repo api', {
      error: err
    });
    throw err;
  }
};
