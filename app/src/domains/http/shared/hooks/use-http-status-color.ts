import { getColorForHttpStatus } from "../utils/get-color-for-http-status";

export const useHttpStatusColor = (status?: number) => {
  return getColorForHttpStatus(status);
};
