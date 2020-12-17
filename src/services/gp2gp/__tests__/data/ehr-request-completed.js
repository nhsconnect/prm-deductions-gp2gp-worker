import { initializeConfig } from '../../../../config';

const config = initializeConfig();
export const nhsNumber = '9465731285';
export const conversationId = 'some-conversation-id-123';
export const messageId = 'some-message-id-456';
export const foundationSupplierAsid = 'foundation-supplier-asid';

export const messageWithoutConversationId = `
------=_MIME-Boundary
<SOAP-ENV:Envelope>
  <SOAP-ENV:Header>
    <eb:CPAId>S2036482A2160104</eb:CPAId>
    <eb:Service>urn:nhs:names:services:gp2gp</eb:Service>
    <eb:Action>COPC_IN000001UK01</eb:Action>
    <eb:MessageData>
        <eb:MessageId>${messageId}</eb:MessageId>
        <eb:Timestamp>2018-06-12T08:29:16Z</eb:Timestamp>
    </eb:MessageData>
  </SOAP-ENV:Header>
  <SOAP-ENV:Body>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
------=_MIME-Boundary--`;

export const messageWithoutMessageId = `
------=_MIME-Boundary
<SOAP-ENV:Envelope>
  <SOAP-ENV:Header>
    <eb:CPAId>S2036482A2160104</eb:CPAId>
    <eb:ConversationId>${conversationId}</eb:ConversationId>
    <eb:Service>urn:nhs:names:services:gp2gp</eb:Service>
    <eb:Action>COPC_IN000001UK01</eb:Action>
    <eb:MessageData>
        <eb:Timestamp>2018-06-12T08:29:16Z</eb:Timestamp>
    </eb:MessageData>
  </SOAP-ENV:Header>
  <SOAP-ENV:Body>
  </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
------=_MIME-Boundary--`;

export const exampleEHRRequestCompleted = `
------=_MIME-Boundary
<SOAP-ENV:Envelope>
  <SOAP-ENV:Header>
    <eb:CPAId>S2036482A2160104</eb:CPAId>
    <eb:ConversationId>${conversationId}</eb:ConversationId>
    <eb:Service>urn:nhs:names:services:gp2gp</eb:Service>
    <eb:Action>RCMR_IN030000UK06</eb:Action>
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
<RCMR_IN030000UK06 xmlns="urn:hl7-org:v3">
 <id root="C258107F-7A3F-4FB5-8B36-D7C0F6496A17" />
 <creationTime value="20131025165328" />
 <versionCode code="V3NPfIT3.1.10" />
 <interactionId root="2.16.840.1.113883.2.1.3.2.4.12"
  extension="RCMR_IN030000UK06" />
 <processingCode code="P" />
 <processingModeCode code="T" />
 <acceptAckCode code="NE" />
 <communicationFunctionRcv typeCode="RCV">
  <device classCode="DEV" determinerCode="INSTANCE">
   <id root="1.2.826.0.1285.0.2.0.107" extension="276827251543" />
  </device>
 </communicationFunctionRcv>
 <communicationFunctionSnd typeCode="SND">
  <device classCode="DEV" determinerCode="INSTANCE">
   <id root="1.2.826.0.1285.0.2.0.107" extension="715373337545" />
  </device>
 </communicationFunctionSnd>
 <ControlActEvent classCode="CACT" moodCode="EVN">
  <author1 typeCode="AUT">
   <AgentSystemSDS classCode="AGNT">
    <agentSystemSDS classCode="DEV" determinerCode="INSTANCE">
     <id root="1.2.826.0.1285.0.2.0.107" extension="715373337545" />
    </agentSystemSDS>
   </AgentSystemSDS>
  </author1>
  <subject typeCode="SUBJ" contextConductionInd="false">
   <EhrExtract classCode="EXTRACT" moodCode="EVN">
    <id root="7DFAECD9-A169-4187-B0A0-2613EDD7D835" />
    <statusCode code="COMPLETE" />
    <availabilityTime value="20131025165328" />
    <recordTarget typeCode="RCT">
     <patient classCode="PAT">
      <id extension="9446363101" root="2.16.840.1.113883.2.1.4.1" />
     </patient>
    </recordTarget>
    <author typeCode="AUT">
     <time nullFlavor="20131025165328" />
     <AgentOrgSDS classCode="AGNT">
      <agentOrganizationSDS classCode="ORG"
       determinerCode="INSTANCE">
       <id extension="B83002" root="1.2.826.0.1285.0.1.10" />
      </agentOrganizationSDS>
     </AgentOrgSDS>
    </author>
    <destination typeCode="DST">
     <AgentOrgSDS classCode="AGNT">
      <agentOrganizationSDS classCode="ORG"
       determinerCode="INSTANCE">
       <id nullFlavor="UNK" />
      </agentOrganizationSDS>
     </AgentOrgSDS>
    </destination>
    <component typeCode="COMP">
     <ehrFolder classCode="FOLDER" moodCode="EVN">
      <id root="AEB45918-8B0A-4391-B1D4-837AF6E46B7D" />
      <statusCode code="COMPLETE" />
      <effectiveTime>
       <low value="20050314" />
       <high value="20131025165328" />
      </effectiveTime>
      <availabilityTime value="20131025165328" />
      <author typeCode="AUT">
       <time value="20131025165328" />
       <AgentOrgSDS classCode="AGNT">
        <agentOrganizationSDS classCode="ORG"
         determinerCode="INSTANCE">
         <id extension="B83002" root="1.2.826.0.1285.0.1.10" />
        </agentOrganizationSDS>
       </AgentOrgSDS>
      </author>
      <responsibleParty typeCode="RESP">
       <agentDirectory classCode="AGNT">
        <part typeCode="PART">
         <Agent classCode="AGNT">
          <id root="9C3AB881-FCDE-48EC-8028-37B20E0AE893" />
          <code code="394745000" displayName="General practice (organisation)"
           codeSystem="2.16.840.1.113883.2.1.3.2.4.15" />
          <agentOrganization classCode="ORG"
           determinerCode="INSTANCE">
           <id extension="B83002" root="2.16.840.1.113883.2.1.4.3" />
           <name>Ilkley and  Wharfedale Medical Practice</name>
           <telecom value="tel:01234567890" use="WP" />
           <addr>
            <streetAddressLine>ILKLEY</streetAddressLine>
            <streetAddressLine>LEEDS</streetAddressLine>
            <streetAddressLine>WEST YORKSHIRE</streetAddressLine>
            <postalCode>LS29 8TH</postalCode>
           </addr>
          </agentOrganization>
         </Agent>
        </part>
        <part typeCode="PART">
         <Agent classCode="AGNT">
          <id root="14CA7344-7460-4C96-BABC-AA0A2C8E96D6 " />
          <id root="2.16.840.1.113883.2.1.4.2" extension="G2141239" />
          <code code="309394004" displayName="General Practitioner Principal">
           <originalText>Partner</originalText>
          </code>
          <agentPerson classCode="PSN" determinerCode="INSTANCE">
           <name>
            <prefix>Dr</prefix>
            <given>Emma</given>
            <family>Anderson</family>
           </name>
          </agentPerson>
          <representedOrganization classCode="ORG"
           determinerCode="INSTANCE">
           <id extension="B83002" root="2.16.840.1.113883.2.1.4.3" />
           <name>Ilkley and Wharfedale Medical Practice</name>
           <telecom value="tel:01234567890" use="WP" />
           <addr>
            <streetAddressLine>ILKLEY</streetAddressLine>
            <streetAddressLine>LEEDS</streetAddressLine>
            <streetAddressLine>WEST YORKSHIRE</streetAddressLine>
            <postalCode>LS29 8TH</postalCode>
           </addr>
          </representedOrganization>
         </Agent>
        </part>
        <part typeCode="PART">
         <Agent classCode="AGNT">
          <id root="791185CE-FF04-4D50-83EC-AA02A8BABB02" />
          <code code="309394004" displayName="General Practitioner Principal">
           <originalText>Administrator</originalText>
          </code>
          <agentPerson classCode="PSN" determinerCode="INSTANCE">
           <name>
            <prefix>Mr</prefix>
            <given>John</given>
            <family>Thompson</family>
           </name>
          </agentPerson>
          <representedOrganization classCode="ORG"
           determinerCode="INSTANCE">
           <id extension="B83002" root="2.16.840.1.113883.2.1.4.3" />
           <name>Ilkley and Wharfedale Medical Practice</name>
           <telecom value="tel:01234567890" use="WP" />
           <addr>
            <streetAddressLine>ILKLEY</streetAddressLine>
            <streetAddressLine>LEEDS</streetAddressLine>
            <streetAddressLine>WEST YORKSHIRE</streetAddressLine>
            <postalCode>LS29 8TH</postalCode>
           </addr>
          </representedOrganization>
         </Agent>
        </part>
        <part typeCode="PART">
         <Agent classCode="AGNT">
          <id root="88B177A7-2C70-4911-82F4-D1B9D8E504F8" />
          <code code="394741009" displayName="Other Health Professional">
           <originalText>Health Visitor</originalText>
          </code>
          <agentPerson classCode="PSN" determinerCode="INSTANCE">
           <name>
            <prefix>Ms</prefix>
            <given>Joan</given>
            <family>Richards</family>
           </name>
          </agentPerson>
         </Agent>
        </part>
        <part typeCode="PART">
         <Agent classCode="AGNT">
          <id root="D1575DF5-E445-4521-AF6E-14C2D1E61265" />
          <id root="2.16.840.1.113883.2.1.4.2" extension="G9489493" />
          <code code="309394004" displayName="General Practitioner Principal">
           <originalText>Partner</originalText>
          </code>
          <agentPerson classCode="PSN" determinerCode="INSTANCE">
           <name>
            <prefix>Dr</prefix>
            <given>Jon</given>
            <family>Abbot</family>
           </name>
          </agentPerson>
          <representedOrganization classCode="ORG"
           determinerCode="INSTANCE">
           <id extension="B83002" root="2.16.840.1.113883.2.1.4.3" />
           <name>Ilkley and Wharfedale Medical Practice</name>
           <telecom value="tel:01234567890" use="WP" />
           <addr>
            <streetAddressLine>ILKLEY</streetAddressLine>
            <streetAddressLine>LEEDS</streetAddressLine>
            <streetAddressLine>WEST YORKSHIRE</streetAddressLine>
            <postalCode>LS29 8TH</postalCode>
           </addr>
          </representedOrganization>
         </Agent>
        </part>
        <part typeCode="PART">
         <Agent classCode="AGNT">
          <id root="CCBD8C5C-E396-4F84-839D-0FD350C75BE7" />
          <agentDevice classCode="DEV" determinerCode="INSTANCE">
           <id root="13CFAAAE-8FD0-456D-B8B7-3F077B05D2FD" />
           <code code="24551000000106" displayName="GP computer systems"
            codeSystem="2.16.840.1.113883.2.1.3.2.4.15" />
           <softwareName>Example System</softwareName>
          </agentDevice>
         </Agent>
        </part>
       </agentDirectory>
      </responsibleParty>
      <component typeCode="COMP">
       <ehrComposition classCode="COMPOSITION" moodCode="EVN">
        <id root="26EE99BB-00FF-4596-9D8B-1D349C1D70A1" />
        <code code="25741000000100" displayName="Third Party Consultation"
         codeSystem="2.16.840.1.113883.2.1.3.2.4.15" />
        <statusCode code="COMPLETE" />
        <effectiveTime>
         <low value="20050314155200" />
         <high value="20131025165328" />
        </effectiveTime>
        <availabilityTime value="20131025165328" />
        <author typeCode="AUT" contextControlCode="OP">
         <time value="20131025165328" />
         <agentRef classCode="AGNT">
          <id root="D1575DF5-E445-4521-AF6E-14C2D1E61265" />
         </agentRef>
        </author>
        <component typeCode="COMP">
         <CompoundStatement classCode="TOPIC"
          moodCode="EVN">
          <id root="DCFDB486-F40A-4266-8B6E-88F9E38FC61A" />
          <code nullFlavor="UNK" />
          <statusCode code="COMPLETE" />
          <effectiveTime>
           <center nullFlavor="NI" />
          </effectiveTime>
          <availabilityTime value="20131025165328" />
          <component typeCode="COMP" contextConductionInd="true">
           <CompoundStatement classCode="CATEGORY"
            moodCode="EVN">
            <id root="8FA84DDE-70DC-462F-8A7F-3C532F9B7D47" />
            <code code="394867009" displayName="Health Administration">
             <originalText>Administration</originalText>
            </code>
            <statusCode code="COMPLETE" />
            <effectiveTime>
             <center nullFlavor="NI" />
            </effectiveTime>
            <availabilityTime value="20131025165328" />
                        <component typeCode="COMP" contextConductionInd="true">
             <NarrativeStatement classCode="OBS"
              moodCode="EVN">
              <id root="FDD5D332-0468-414A-84E5-AFDAD5B37BCE" />
              <text>application/binary</text>
              <statusCode code="COMPLETE" />
              <availabilityTime value="20131025165328" />
              <reference typeCode="REFR">
               <referredToExternalDocument
                classCode="DOC" moodCode="EVN">
                <id root="_1C135B3C-5AA5-4BF1-A08B-E6002455B806" />
                <code code="9b36.00" displayName="Other digital signal"
                 codeSystem="2.16.840.1.113883.2.1.6.10">
                 <originalText>Other Attachment</originalText>
                 <qualifier>
                  <name code="mediatype" displayName="Media Type" />
                  <value code="MMT011" displayName="Other Attachment" />
                 </qualifier>
                 <qualifier>
                  <name code="entity_ty" displayName="Entity Type" />
                  <value code="627" displayName="ATTACHMENT" />
                 </qualifier>
                 <qualifier>
                  <name code="thirdparty" displayName="Third Party" />
                  <value code="1" displayName="Yes" />
                 </qualifier>
                 <qualifier>
                  <name code="private" displayName="Private" />
                  <value code="0" displayName="No" />
                 </qualifier>
                 <translation code="9b36.00" displayName="Other digital signal"
                  codeSystem="2.16.840.1.113883.2.1.6.2" />
                 <translation code="37251000000104"
                  displayName="Other digital signal" codeSystem="2.16.840.1.113883.2.1.3.2.4.15" />
                </code>
                <text mediaType="application/binary">
                 <reference value="file://localhost/1C135B3C-5AA5-4BF1-A08B-E6002455B806_image.tif" />
                </text>
               </referredToExternalDocument>
              </reference>
             </NarrativeStatement>
            </component>            <component typeCode="COMP" contextConductionInd="true">
             <NarrativeStatement classCode="OBS"
              moodCode="EVN">
              <id root="5703D932-5A3F-42FD-BA9E-4C7CDDFF0656" />
              <text>text/plain</text>
              <statusCode code="COMPLETE" />
              <availabilityTime value="20131025165328" />
              <reference typeCode="REFR">
               <referredToExternalDocument
                classCode="DOC" moodCode="EVN">
                <id root="_277F29F1-FEAB-4D38-8266-FEB7A1E6227D" />
                <code code="9b36.00" displayName="Other digital signal"
                 codeSystem="2.16.840.1.113883.2.1.6.10">
                 <originalText>Other Attachment</originalText>
                 <qualifier>
                  <name code="mediatype" displayName="Media Type" />
                  <value code="MMT011" displayName="Other Attachment" />
                 </qualifier>
                 <qualifier>
                  <name code="entity_ty" displayName="Entity Type" />
                  <value code="627" displayName="ATTACHMENT" />
                 </qualifier>
                 <qualifier>
                  <name code="thirdparty" displayName="Third Party" />
                  <value code="1" displayName="Yes" />
                 </qualifier>
                 <qualifier>
                  <name code="private" displayName="Private" />
                  <value code="0" displayName="No" />
                 </qualifier>
                 <translation code="9b36.00" displayName="Other digital signal"
                  codeSystem="2.16.840.1.113883.2.1.6.2" />
                 <translation code="37251000000104"
                  displayName="Other digital signal" codeSystem="2.16.840.1.113883.2.1.3.2.4.15" />
                </code>
                <text mediaType="text/plain">
                 <reference value="file://localhost/277F29F1-FEAB-4D38-8266-FEB7A1E6227D_LICENSE.txt" />
                </text>
               </referredToExternalDocument>
              </reference>
             </NarrativeStatement>
            </component>            <component typeCode="COMP" contextConductionInd="true">
             <NarrativeStatement classCode="OBS"
              moodCode="EVN">
              <id root="7D88CB4A-7989-42E0-901D-816DAA869D08" />
              <text>text/plain</text>
              <statusCode code="COMPLETE" />
              <availabilityTime value="20131025165328" />
              <reference typeCode="REFR">
               <referredToExternalDocument
                classCode="DOC" moodCode="EVN">
                <id root="_7CCB6A77-360E-434E-8CF4-97C7C2B47D70" />
                <code code="9b36.00" displayName="Other digital signal"
                 codeSystem="2.16.840.1.113883.2.1.6.10">
                 <originalText>Other Attachment</originalText>
                 <qualifier>
                  <name code="mediatype" displayName="Media Type" />
                  <value code="MMT011" displayName="Other Attachment" />
                 </qualifier>
                 <qualifier>
                  <name code="entity_ty" displayName="Entity Type" />
                  <value code="627" displayName="ATTACHMENT" />
                 </qualifier>
                 <qualifier>
                  <name code="thirdparty" displayName="Third Party" />
                  <value code="1" displayName="Yes" />
                 </qualifier>
                 <qualifier>
                  <name code="private" displayName="Private" />
                  <value code="0" displayName="No" />
                 </qualifier>
                 <translation code="9b36.00" displayName="Other digital signal"
                  codeSystem="2.16.840.1.113883.2.1.6.2" />
                 <translation code="37251000000104"
                  displayName="Other digital signal" codeSystem="2.16.840.1.113883.2.1.3.2.4.15" />
                </code>
                <text mediaType="text/plain">
                 <reference value="file://localhost/7CCB6A77-360E-434E-8CF4-97C7C2B47D70_book.txt" />
                </text>
               </referredToExternalDocument>
              </reference>
             </NarrativeStatement>
            </component>            <component typeCode="COMP" contextConductionInd="true">
             <NarrativeStatement classCode="OBS"
              moodCode="EVN">
              <id root="2531F667-AA89-4540-A50B-56298B13FC4C" />
              <text>video/mpeg</text>
              <statusCode code="COMPLETE" />
              <availabilityTime value="20131025165328" />
              <reference typeCode="REFR">
               <referredToExternalDocument
                classCode="DOC" moodCode="EVN">
                <id root="_8681AF4F-E577-4C8D-A2CE-43CABE3D5FB4" />
                <code code="9b36.00" displayName="Other digital signal"
                 codeSystem="2.16.840.1.113883.2.1.6.10">
                 <originalText>Other Attachment</originalText>
                 <qualifier>
                  <name code="mediatype" displayName="Media Type" />
                  <value code="MMT011" displayName="Other Attachment" />
                 </qualifier>
                 <qualifier>
                  <name code="entity_ty" displayName="Entity Type" />
                  <value code="627" displayName="ATTACHMENT" />
                 </qualifier>
                 <qualifier>
                  <name code="thirdparty" displayName="Third Party" />
                  <value code="1" displayName="Yes" />
                 </qualifier>
                 <qualifier>
                  <name code="private" displayName="Private" />
                  <value code="0" displayName="No" />
                 </qualifier>
                 <translation code="9b36.00" displayName="Other digital signal"
                  codeSystem="2.16.840.1.113883.2.1.6.2" />
                 <translation code="37251000000104"
                  displayName="Other digital signal" codeSystem="2.16.840.1.113883.2.1.3.2.4.15" />
                </code>
                <text mediaType="video/mpeg">
                 <reference value="file://localhost/8681AF4F-E577-4C8D-A2CE-43CABE3D5FB4_sample_mpeg4.mp4" />
                </text>
               </referredToExternalDocument>
              </reference>
             </NarrativeStatement>
            </component>
           </CompoundStatement>
          </component>
         </CompoundStatement>
        </component>
       </ehrComposition>
      </component>
     </ehrFolder>
    </component>
    <inFulfillmentOf typeCode="FLFS">
     <priorEhrRequest classCode="EXTRACT" moodCode="RQO">
      <id nullFlavor="UNK" />
     </priorEhrRequest>
    </inFulfillmentOf>
    <limitation typeCode="LIMIT" inversionInd="true">
     <limitingEhrExtractSpecification
      classCode="OBS" moodCode="DEF">
      <id root="94BA37B9-53F2-475B-A206-0535BD9E336D" />
      <code code="37241000000102" displayName="Entire record available to originator"
       codeSystem="2.16.840.1.113883.2.1.3.2.4.15" />
     </limitingEhrExtractSpecification>
    </limitation>
   </EhrExtract>
  </subject>
 </ControlActEvent>
</RCMR_IN030000UK06>
------=_MIME-Boundary--`;

export const ehrRequestCompletedMessage = `------=_MIME-Boundary
Content-Type: application/xml
Content-ID: <50D33D75-04C6-40AF-947D-E6E9656C1EEB@inps.co.uk/Vision/3>
Content-Transfer-Encoding: 8bit

<SOAP-ENV:Envelope>
      <SOAP-ENV:Header>
        <eb:CPAId>S2036482A2160104</eb:CPAId>
        <eb:ConversationId>${conversationId}</eb:ConversationId>
        <eb:Service>urn:nhs:names:services:gp2gp</eb:Service>
        <eb:Action>RCMR_IN030000UK06</eb:Action>
        <eb:MessageData>
            <eb:MessageId>${messageId}</eb:MessageId>
            <eb:Timestamp>2018-06-12T08:29:16Z</eb:Timestamp>
        </eb:MessageData>
      </SOAP-ENV:Header>
      <SOAP-ENV:Body>
          <eb:Manifest eb:version="2.0">
              <eb:Reference eb:id="_FE6A40B9-F4C6-4041-A306-EA2A149411CD" xlink:href="cid:FE6A40B9-F4C6-4041-A306-EA2A149411CD@inps.co.uk/Vision/3">
                  <eb:Description xml:lang="en-GB">COPC_IN000001UK01</eb:Description>
              </eb:Reference>
          </eb:Manifest>
      </SOAP-ENV:Body>
    </SOAP-ENV:Envelope>

    ------=_MIME-Boundary

  <RCMR_IN030000UK06>
    <id root="${messageId}"/>
    <communicationFunctionRcv typeCode="RCV">
    <interactionId extension="RCMR_IN030000UK06" root="2.16.840.1.113883.2.1.3.2.4.12"/>
        <device classCode="DEV" determinerCode="INSTANCE">
            <id extension="${config.deductionsAsid}" root="1.2.826.0.1285.0.2.0.107"/>
        </device>
    </communicationFunctionRcv>
    <communicationFunctionSnd typeCode="SND">
        <device classCode="DEV" determinerCode="INSTANCE">
            <id extension="${foundationSupplierAsid}" root="1.2.826.0.1285.0.2.0.107"/>
        </device>
    </communicationFunctionSnd>
    <patient classCode="PAT">
        <id extension="${nhsNumber}" root="2.16.840.1.113883.2.1.4.1"/>
    </patient>
  </RCMR_IN030000UK06>

  ------=_MIME-Boundary--`;

export const noNhsNumber = `------=_MIME-Boundary
Content-Type: application/xml
Content-ID: <50D33D75-04C6-40AF-947D-E6E9656C1EEB@inps.co.uk/Vision/3>
Content-Transfer-Encoding: 8bit

<SOAP-ENV:Envelope>
      <SOAP-ENV:Header>
        <eb:CPAId>S2036482A2160104</eb:CPAId>
        <eb:ConversationId>${conversationId}</eb:ConversationId>
        <eb:Service>urn:nhs:names:services:gp2gp</eb:Service>
        <eb:Action>RCMR_IN030000UK06</eb:Action>
        <eb:MessageData>
            <eb:MessageId>${messageId}</eb:MessageId>
            <eb:Timestamp>2018-06-12T08:29:16Z</eb:Timestamp>
        </eb:MessageData>
      </SOAP-ENV:Header>
      <SOAP-ENV:Body>
          <eb:Manifest eb:version="2.0">
              <eb:Reference eb:id="_FE6A40B9-F4C6-4041-A306-EA2A149411CD" xlink:href="cid:FE6A40B9-F4C6-4041-A306-EA2A149411CD@inps.co.uk/Vision/3">
                  <eb:Description xml:lang="en-GB">COPC_IN000001UK01</eb:Description>
              </eb:Reference>
          </eb:Manifest>
      </SOAP-ENV:Body>
    </SOAP-ENV:Envelope>

    ------=_MIME-Boundary

  <RCMR_IN030000UK06>
    <id root="${messageId}"/>
    <communicationFunctionRcv typeCode="RCV">
    <interactionId extension="RCMR_IN030000UK06" root="2.16.840.1.113883.2.1.3.2.4.12"/>
        <device classCode="DEV" determinerCode="INSTANCE">
            <id extension="${config.deductionsAsid}" root="1.2.826.0.1285.0.2.0.107"/>
        </device>
    </communicationFunctionRcv>
    <communicationFunctionSnd typeCode="SND">
        <device classCode="DEV" determinerCode="INSTANCE">
            <id extension="${foundationSupplierAsid}" root="1.2.826.0.1285.0.2.0.107"/>
        </device>
    </communicationFunctionSnd>
  </RCMR_IN030000UK06>

  ------=_MIME-Boundary--`;
