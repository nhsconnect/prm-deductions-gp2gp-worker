import { logInfo, logError } from '../../config/logging';
import { fetchStorageUrl } from './fetch-ehr-repo-storage-url';
import { putMessageInEhrRepo } from './put-message-in-ehr-repo';
import { confirmMessageStored } from './confirm-message-stored';

const storeMessageInEhrRepo = async (message, soapInformation) => {
  try {
    const { data: url } = await fetchStorageUrl(soapInformation);
    logInfo('Storing EHR in s3 bucket', { ehrRepository: { url } });
    await putMessageInEhrRepo(url, message);
    await confirmMessageStored(soapInformation);
  } catch (err) {
    logError('failed to store message to ehr repository', {
      error: err.stack
    });
  }
};

export { storeMessageInEhrRepo };
