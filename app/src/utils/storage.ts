import store from "store";

export const Storage = {
  get: store.get.bind(store),
  set: store.set.bind(store),
};
