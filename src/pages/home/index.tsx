import React from "react";
import { connect } from "react-redux";
import { delayInc, delayDec } from "@/store/counter/slice";
import cls from "./index.less";
import { THTTPMethod } from "@/typings/http";
import HTTPRequestForm from "@/components/modules/HttpRequestForm";

const onChange = (val: THTTPMethod) => {
  console.log(val);
};
const mSp = ({ counter }: { counter: number }) => ({
  counter,
});
const mDp = {
  delayInc,
  delayDec,
};

type Props = {
  counter: number;
  inc(): void;
  dec(): void;
};
export const IndexPage = (props: Props) => {
  return (
    <main>
      <HTTPRequestForm />
    </main>
  );
};

export default connect(mSp, mDp)(IndexPage);
