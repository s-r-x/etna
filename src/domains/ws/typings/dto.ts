import { TWsLogItem } from "./store";

export interface IConnectDto {
  url: string;
  path?: string;
}
export interface INotifySagaDto extends TWsLogItem {}
