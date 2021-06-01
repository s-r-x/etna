import { Color } from "@/utils/color";
export const useHttpStatusColor = (status?: number) => {
  return Color.getColorForHttpStatus(status);
};
