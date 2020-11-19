import { createSelector } from "@reduxjs/toolkit";
import { TRootState } from "@/store/rootReducer";
import { DOMAIN } from "./slice";

const getActiveProvider = (state: TRootState) => state[DOMAIN].activeProvider;
const getProviders = (state: TRootState) => state[DOMAIN].providers;
const getProviderData = createSelector(
  [getActiveProvider, getProviders],
  (active, providers) => providers[active]
);
const getUrl = createSelector(getProviderData, (data) => data.url);
const isConnected = createSelector(getProviderData, (data) => data.connected);

export const WsSelectors = {
  getUrl,
  isConnected,
  getActiveProvider,
};
