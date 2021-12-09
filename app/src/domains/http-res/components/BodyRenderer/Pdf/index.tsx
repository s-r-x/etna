import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import { Pagination } from "antd";
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type TProps = {
  document: string;
};
const PdfRenderer = (props: TProps) => {
  const [pages, setPages] = useState(null as number);
  const [page, setPage] = useState(1);
  const onDocumentLoad = (e: any) => {
    setPages(e.numPages);
  };
  return (
    <div>
      <div
        style={{
          marginBottom: "10px",
        }}
      >
        <Pagination
          onChange={setPage}
          total={pages}
          pageSize={1}
          current={page}
        />
      </div>
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
