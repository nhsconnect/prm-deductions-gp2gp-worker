import { context, getSpan } from '@opentelemetry/api';
import { logInfo } from '../../config/logging';
import { parseMultipartBody } from '../parser/';
import { soapEnvelopeHandler } from '../soap';
import { sendPdsUpdate } from '../gp-to-repo/';

const PDS_GENERAL_UPDATE_REQUEST_ACCEPTED = 'PRPA_IN000202UK01';

class PDSGeneralUpdateRequestAccepted {
  constructor() {
    this.name = 'PDS General Update Request Accepted';
    this.interactionId = PDS_GENERAL_UPDATE_REQUEST_ACCEPTED;
  }

  async handleMessage(message) {
    logInfo('Parsing PRPA_IN000202UK01 Message', {
      parser: { name: this.name, interactionId: this.interactionId }
    });
    const multipartMessage = await parseMultipartBody(message);
    const soapInformation = await soapEnvelopeHandler(multipartMessage[0].body);
    const messageSpan = getSpan(context.active());
    const conversationId = soapInformation.conversationId;

    if (messageSpan) {
      // TODO: use messageSpan.setAttribute function instead once opentelemetry version is bumped up
      messageSpan.attributes = { conversationId };
    }

    logInfo('SOAP Information Extracted', {
      messageDetails: soapInformation,
      conversationId
    });
    await sendPdsUpdate(conversationId);
  }
}

export { PDSGeneralUpdateRequestAccepted, PDS_GENERAL_UPDATE_REQUEST_ACCEPTED };
