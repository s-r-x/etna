import { useMemo } from "react";
import { HTTP_STATUS_CODES } from "@/constants/http";

export const useHttpStatusHint = (status?: number) => {
  return useMemo(() => {
    if (!status) {
      return "Unknown code";
    }
    const meta = HTTP_STATUS_CODES.find(({ value }) => value === status);
    if (meta) {
      return meta.hint;
    } else {
      return "Unknown code";
    }
  }, [status]);
};
