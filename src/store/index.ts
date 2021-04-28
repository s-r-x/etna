import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import {
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { updateSearchForm } from "@/domains/http-req-history/store/slice";

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];
const store = configureStore({
  reducer: rootReducer,
  middleware: [
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
          updateSearchForm.type,
        ],
      },
    }),
    ...middleware,
  ],
});
export const persistor = persistStore(store);
if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./rootReducer", () => store.replaceReducer(rootReducer));
}

sagaMiddleware.run(rootSaga);

export default store;
