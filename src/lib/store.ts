import { configureStore } from "@reduxjs/toolkit";
import apiReducer from "./features/api";
import { roomSlice } from "./features/room-slice";
import { playerSlice } from "./features/player-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      api: apiReducer.reducer,
      room: roomSlice.reducer,
      player: playerSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(apiReducer.middleware),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
