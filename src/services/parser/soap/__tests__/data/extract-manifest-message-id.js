export const noManifest = `
        <eb:Body>
        </eb:Body>
    `;

export const multipleManifestReferences = `
    <SOAP-ENV:Body>
        <eb:Manifest eb:version="2.0">
            <eb:Reference eb:id="_FE6A40B9-F4C6-4041-A306-EA2A149411CD" xlink:href="cid:FE6A40B9-F4C6-4041-A306-EA2A149411CD@inps.co.uk/Vision/3">
                <eb:Description xml:lang="en-GB">COPC_IN000001UK01</eb:Description>
                <hl7ebXML:Payload encoding="XML" style="HL7" version="3.0"/>
            </eb:Reference>
            <eb:Reference eb:id="_09D8E406-B106-4CCB-A3E3-C4EBC2F17BF8" xlink:href="cid:09D8E406-B106-4CCB-A3E3-C4EBC2F17BF8@inps.co.uk/Vision/3">
                <eb:Description xml:lang="en-GB">Filename="588210BB-401D-41F9-84D2-978697CEEFE5_00011000.tif" ContentType=image/tiff Compressed=No LargeAttachment=No OriginalBase64=No Length=4718592</eb:Description>
            </eb:Reference>
            <eb:Reference eb:id="_1FEE18C6-8184-4961-A848-7F13903A2ACF" xlink:href="mid:1FEE18C6-8184-4961-A848-7F13903A2ACF">
                <eb:Description xml:lang="en-GB">Filename="588210BB-401D-41F9-84D2-978697CEEFE5_00011000.tif" ContentType=image/tiff Compressed=No LargeAttachment=No OriginalBase64=Yes Length=4718592</eb:Description>
            </eb:Reference>
            <eb:Reference eb:id="_482CDD0C-C361-4961-99D6-ACF80B2FE17D" xlink:href="mid:482CDD0C-C361-4961-99D6-ACF80B2FE17D">
                <eb:Description xml:lang="en-GB">Filename="588210BB-401D-41F9-84D2-978697CEEFE5_00011000.tif" ContentType=image/tiff Compressed=No LargeAttachment=No OriginalBase64=Yes Length=3448920</eb:Description>
            </eb:Reference>
        </eb:Manifest>
    </SOAP-ENV:Body>
    `;

export const singleManifestReference = `
    <SOAP-ENV:Body>
        <eb:Manifest eb:version="2.0">
            <eb:Reference eb:id="_FE6A40B9-F4C6-4041-A306-EA2A149411CD" xlink:href="cid:FE6A40B9-F4C6-4041-A306-EA2A149411CD@inps.co.uk/Vision/3">
                <eb:Description xml:lang="en-GB">COPC_IN000001UK01</eb:Description>
            </eb:Reference>
        </eb:Manifest>
    </SOAP-ENV:Body>
    `;
