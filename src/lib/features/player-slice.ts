import { IPlayer } from "@/app/interfaces/player";
import { setSSValue } from "@/app/utils/localStorage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  name: "",
} as IPlayer;

export const playerSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    updatePlayerData: (state, { payload }: PayloadAction<IPlayer>) => {
      return payload;
    },
  },
});

export default playerSlice.reducer;
export const { updatePlayerData } = playerSlice.actions;
