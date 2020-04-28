import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";

const mSp = (state: TRootState) => ({});
const mDp = {};

export const provide = connect(mSp, mDp);
export type TProviderProps = ConnectedProps<typeof provide>;
