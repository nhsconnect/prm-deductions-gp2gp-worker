export const conversationId = 'some-conversation-id-123';
export const messageId = 'some-message-id-456';

export const messageWithoutAction = `
------=_MIME-Boundary
<SOAP-ENV:Envelope>
  <SOAP-ENV:Header>
    <eb:CPAId>S2036482A2160104</eb:CPAId>
    <eb:ConversationId>${conversationId}</eb:ConversationId>
    <eb:Service>urn:nhs:names:services:gp2gp</eb:Service>
    <eb:MessageData>
        <eb:MessageId>${messageId}</eb:MessageId>
        <eb:Timestamp>2018-06-12T08:29:16Z</eb:Timestamp>
    </eb:MessageData>
  </SOAP-ENV:Header>
  <SOAP-ENV:Body>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
------=_MIME-Boundary--`;

export const unhandledInteractionId = `------=_MIME-Boundary
Content-Type: application/xml
Content-ID: <50D33D75-04C6-40AF-947D-E6E9656C1EEB@inps.co.uk/Vision/3>
Content-Transfer-Encoding: 8bit

<SOAP-ENV:Envelope>
  <SOAP-ENV:Header>
    <eb:CPAId>S2036482A2160104</eb:CPAId>
    <eb:ConversationId>${conversationId}</eb:ConversationId>
    <eb:Service>urn:nhs:names:services:gp2gp</eb:Service>
    <eb:Action>FAKE_IN030000UK06</eb:Action>
    <eb:MessageData>
        <eb:MessageId>${messageId}</eb:MessageId>
        <eb:Timestamp>2018-06-12T08:29:16Z</eb:Timestamp>
    </eb:MessageData>
  </SOAP-ENV:Header>
  <SOAP-ENV:Body>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
    ------=_MIME-Boundary
  Content-Type: application/xml
  Content-ID: <50D33D75-04C6-40AF-947D-E6E9656C1EEB@inps.co.uk/Vision/3>
  Content-Transfer-Encoding: 8bit

  <FAKE_IN030000UK06>
    <id root="${messageId}"/>
  </FAKE_IN030000UK06>
  ------=_MIME-Boundary--`;
