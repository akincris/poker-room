import { IRoom } from "@/app/interfaces/room";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
  id: "",
  players: [],
} as IRoom;

export const roomSlice = createSlice({
  name: "room",
  initialState,
  reducers: {
    updateRoomData: (state, { payload }: PayloadAction<IRoom>) => payload,
  },
});

export default roomSlice.reducer;
export const { updateRoomData } = roomSlice.actions;
