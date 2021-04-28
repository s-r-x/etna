import { BaseType } from "antd/lib/typography/Base";
import { EWsRouteType } from "./store";

export type TWsLogUIItem = {
  id: string;
  typography: BaseType;
  room?: string;
  message: string;
  event: string;
  date: string;
  route: EWsRouteType;
};
