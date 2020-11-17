import { THTTPBodyMIME } from "@/typings/http";
import { TKeyValue } from "@/typings/keyValue";

export type THttpReqBodyState = {
  mime: THTTPBodyMIME;
  text: string;
  kv: TKeyValue[];
  gql: {
    schema: string;
    loading: boolean;
    error: any;
    vars: string;
  };
};
