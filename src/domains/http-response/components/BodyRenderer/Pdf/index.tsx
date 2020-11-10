import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { PDFDocumentProxy } from "pdfjs-dist";
import { Pagination } from "antd";

type TProps = {
  document: string;
};
const PdfRenderer = (props: TProps) => {
  const [pages, setPages] = useState(null as number);
  const [page, setPage] = useState(1);
  const onDocumentLoad = (e: PDFDocumentProxy) => {
    setPages(e.numPages);
  };
  return (
    <div>
      <Pagination
        onChange={setPage}
        total={pages}
        pageSize={1}
        current={page}
      />
      <Document
        renderMode="canvas"
        file={props.document}
        onLoadSuccess={onDocumentLoad}
      >
        <Page pageNumber={page} />
      </Document>
    </div>
  );
};

export default PdfRenderer;
