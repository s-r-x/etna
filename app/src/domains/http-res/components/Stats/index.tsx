import React, { useMemo } from "react";
import { Color } from "@/utils/color";
import { HTTP_STATUS_CODES } from "@/constants/http";
import View from "./view";
import { connect, ConnectedProps } from "react-redux";
import { HttpResponseSelectors as Selectors } from "../../store/selectors";

const connector = connect((state) => ({
  time: Selectors.getFormattedResponseTime(state),
  size: Selectors.getFormattedResponseSize(state),
  status: Selectors.getResponseStatus(state),
}));
type TProps = ConnectedProps<typeof connector>;
const Stats = (props: TProps) => {
  const statusHint = useMemo(() => {
    if (!props.status) {
      return "Unknown code";
    }
    const meta = HTTP_STATUS_CODES.find(({ value }) => value === props.status);
    if (meta) {
      return meta.hint;
    } else {
      return "Unknown code";
    }
  }, [props.status]);
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
