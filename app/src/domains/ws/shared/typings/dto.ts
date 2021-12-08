import { TWsLogItem } from "./";

export interface IConnectDto {
  url: string;
  path?: string;
}
export interface INotifySagaDto extends TWsLogItem {}
