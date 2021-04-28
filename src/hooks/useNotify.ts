import { useEffect } from "react";
import { message as notify } from "antd";
export const useNotifyError = (msg: string) => {
  useEffect(() => {
    if (msg) {
      notify.error(msg);
    }
  }, [msg]);
};
