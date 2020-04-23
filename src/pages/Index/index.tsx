import * as React from "react";
import { connect } from "react-redux";
import { delayInc, delayDec } from "@/store/counter/slice";
import cls from "./index.less";

const mSp = ({ counter }: { counter: number }) => ({
  counter,
});
const mDp = (dispatch: Function) => ({
  inc: () => dispatch(delayInc()),
  dec: () => dispatch(delayDec()),
});

type Props = {
  counter: number;
  inc(): void;
  dec(): void;
};
export const IndexPage = (props: Props) => {
  const { counter, inc, dec } = props;
  return (
    <main className={cls.main}>
      <h1>Create something rad</h1>
      <h2>(or just a tiny counter)</h2>
      <div className={cls.counterContainer}>
        <button type="button" id="dec" onClick={dec}>
          -
        </button>
        <span id="counter" className="counter">
          {counter}
        </span>
        <button type="button" id="inc" onClick={inc}>
          +
        </button>
      </div>
    </main>
  );
};

export default connect(mSp, mDp)(IndexPage);
