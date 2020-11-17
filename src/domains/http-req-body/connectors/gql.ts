import { HttpReqBodySelectors as Selectors } from "../store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import { HttpReqBodyActions as Actions } from "../store/slice";

export const connector = connect(
  (state: TRootState) => ({
    loading: Selectors.isGqlSchemaLoading(state),
    vars: Selectors.getGqlVars(state),
    schema: Selectors.getGqlSchema(state),
  }),
  {
    cancelLoadGqlSchema: Actions.cancelLoadGqlSchema,
    loadGqlSchema: Actions.loadGqlSchema,
    updateGqlVars: Actions.updateGqlVars,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
