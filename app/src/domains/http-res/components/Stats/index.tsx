import React from "react";
import { Color } from "@/utils/color";
import View from "./view";
import { connect, ConnectedProps } from "react-redux";
import { HttpResponseSelectors as Selectors } from "../../store/selectors";
import { useHttpStatusHint } from "@/hooks/useHttpStatusHint";

const connector = connect((state) => ({
  time: Selectors.getFormattedResponseTime(state),
  size: Selectors.getFormattedResponseSize(state),
  status: Selectors.getResponseStatus(state),
}));
type TProps = ConnectedProps<typeof connector>;
const Stats = (props: TProps) => {
  const statusHint = useHttpStatusHint(props.status);
  return (
    <View
      status={props.status}
      statusColor={Color.getColorForHttpStatus(props.status)}
      statusHint={statusHint}
      size={props.size}
      time={props.time}
    />
  );
};

export default connector(Stats);
