import React from "react";
import KVEditor from "./Kv";
import Gql from "./Gql";
import TextEditor from "./Text";
import { useSelector } from "react-redux";
import { HttpReqBodySelectors as Selectors } from "@/domains/http-req/body/store/selectors";

const BodyEditor = () => {
  const activeEditor = useSelector(Selectors.getActiveEditor);
  return (
    <>
      {activeEditor === "kv" && <KVEditor />}
      {activeEditor === "text" && <TextEditor />}
      {activeEditor === "graphql" && <Gql />}
    </>
  );
};
export default BodyEditor;
