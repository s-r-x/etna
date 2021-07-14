import { TEnhancedKeyValue } from "./store";

export type TChangeKVDto = {
  id: any;
} & Omit<TEnhancedKeyValue, "key">;
