import React, { useMemo } from "react";
import ms from "pretty-ms";
import pb from "pretty-bytes";
import { Color } from "@/utils/color";
import { HTTP_STATUS_CODES } from "@/misc/http";
import { TConnectorProps } from "../../connectors";
import View from "./view";

type TProps = Pick<TConnectorProps, "response" | "responseSize">;

const Stats = ({ response, responseSize }: TProps) => {
  const statusHint = useMemo(() => {
    if (!response.status) {
      return "Unknown code";
    }
    const meta = HTTP_STATUS_CODES.find(
      ({ value }) => value === response.status
    );
    if (meta) {
      return meta.hint;
    } else {
      return "Unknown code";
    }
  }, [response.status]);
  return (
    <View
      status={response.status}
      statusColor={Color.getColorForHttpStatus(response.status)}
      statusHint={statusHint}
      size={responseSize && pb(responseSize)}
      time={ms(response.responseTime)}
    />
  );
};

export default Stats;
