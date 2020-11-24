import { BaseType } from "antd/lib/typography/Base";
import { EWsRouteType } from "./store";

export type TWsLogUIItem = {
  id: string;
  typography: BaseType;
  message: string;
  event: string;
  date: string;
  route: EWsRouteType;
};
