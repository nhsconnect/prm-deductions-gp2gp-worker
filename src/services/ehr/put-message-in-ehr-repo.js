import axios from 'axios';
import { logger } from '../../config/logging';

export const putMessageInEhrRepo = async (url, message) => {
  try {
    const response = await axios.put(url, message);
    logger.log('INFO', 'putMessageInEhrRepo success', {
      ehrRepository: { responseCode: response.status, responseMessage: response.statusText }
    });
    return response;
  } catch (err) {
    logger.log('ERROR', 'failed to store message to s3 via pre-signed url', {
      error: err.stack
    });
    throw err;
  }
};
