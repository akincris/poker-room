import { configureStore } from "@reduxjs/toolkit";
import { roomSlice } from "./features/room-slice";
import { playerSlice } from "./features/player-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      room: roomSlice.reducer,
      player: playerSlice.reducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
