import FullHeightCard from "@/components/atoms/FullHeightCard";
import React from "react";
import Editors from "./EditorsTabs";
import Form from "./MainForm";

const HttpRequest = () => {
  return (
    <FullHeightCard>
      <Form />
      <Editors />
    </FullHeightCard>
  );
};

export default HttpRequest;
