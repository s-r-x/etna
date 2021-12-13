import { THTTPBodyMIME } from "@/typings/http";
import { TKeyValue } from "@/typings/keyValue";

export type TEnhancedKeyValue = TKeyValue & {
  isFile?: boolean;
  value: string;
  mime?: string;
  fileName?: string;
};
export type THttpReqBodyState = {
  mime: THTTPBodyMIME;
  text: string;
  kv: TEnhancedKeyValue[];
  gql: {
    schema: string;
    loading: boolean;
    error: any;
    vars: string;
  };
};
