type TProvidersMeta = {
  [key in TWsProvider]: {
    url: string;
    connected: boolean;
  };
};
export type TState = {
  activeProvider: TWsProvider;
  providers: TProvidersMeta;
};
