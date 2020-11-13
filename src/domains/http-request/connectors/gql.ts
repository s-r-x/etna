import { HttpRequestSelectors as Selectors } from "../store/selectors";
import { connect, ConnectedProps } from "react-redux";
import { TRootState } from "@/store/rootReducer";
import {
  loadGqlSchema,
  updateGqlVars,
  cancelLoadGqlSchema,
} from "../store/slice";

export const connector = connect(
  (state: TRootState) => ({
    loading: Selectors.isGqlSchemaLoading(state),
    vars: Selectors.getGqlVars(state),
    schema: Selectors.getGqlSchema(state),
  }),
  {
    cancelLoadGqlSchema,
    loadGqlSchema,
    updateGqlVars,
  }
);
export type TConnectorProps = ConnectedProps<typeof connector>;
