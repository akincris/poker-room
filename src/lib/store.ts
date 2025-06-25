import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./features/api";

export const makeStore = () => {
  return configureStore({
    reducer: {
      api: apiReducer.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiReducer.middleware),
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
