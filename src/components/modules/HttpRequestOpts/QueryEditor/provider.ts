import { HttpRequestSelectors as Selectors } from "@/store/httpRequest/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";

const mSp = (state: TRootState) => ({
  query: Selectors.getParsedQuery(state),
});
const mDp = {};

export const provide = connect(mSp, mDp);
export type TProviderProps = ConnectedProps<typeof provide>;