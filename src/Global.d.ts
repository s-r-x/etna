import { TTheme } from "@/domains/theme/typings/theme";
declare module "*.svg";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";

declare module "styled-components" {
  export interface DefaultTheme extends TTheme {}
}
declare global {
  type TStringDict = { [key: string]: string };
  type TAnyDict = { [key: string]: any };
}
