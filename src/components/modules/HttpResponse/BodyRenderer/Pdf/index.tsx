import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { PDFDocumentProxy } from "pdfjs-dist";

type TProps = {
  document: string;
};
const PdfRenderer = (props: TProps) => {
  const [pages, setPages] = useState(null as number);
  const [page] = useState(1);
  const onDocumentLoad = (e: PDFDocumentProxy) => {
    setPages(e.numPages);
  };
  return (
    <div>
      <Document
        renderMode="canvas"
        file={props.document}
        onLoadSuccess={onDocumentLoad}
      >
        <Page pageNumber={page} />
      </Document>
      <p>
        Page {page} of {pages}
      </p>
    </div>
  );
};

export default PdfRenderer;
