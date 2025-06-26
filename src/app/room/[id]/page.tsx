"use client";
import React, { useEffect } from "react";
import { CardPicker } from "../../components/Room/CardPicker";
import { ParticipantList } from "../../components/Room/Participants";
import { socket } from "@/socket";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateRoomData } from "@/lib/features/room-slice";
import { redirect } from "next/navigation";
import { IRoom } from "@/app/interfaces/room";

export default function Room({ params }: any) {
  const dispatch = useAppDispatch();
  const { id }: { id: string } = React.use(params);
  const player = useAppSelector((state) => state.player);

  useEffect(() => {
    socket.emit("getRoomData", id);

    socket.on("roomData", (room: IRoom) => {
      if (!room) redirect("/");
      dispatch(updateRoomData(room));
    });
  }, []);

  useEffect(() => {
    const handleGameExit = () => {
      socket.emit("playerDisconnected", { roomId: id, player }, () => {
        redirect("/");
      });
    };

    window.addEventListener("beforeunload", handleGameExit);

    return () => {
      window.removeEventListener("beforeunload", handleGameExit);
    };
  }, []);

  return (
    <div className="flex flex-col gap-10 pt-2 items-center">
      <h4 className="text-2xl lg:text-4xl font-semibold opacity-50">
        Room [{id}]
      </h4>

      <div className="flex w-full gap-4 relative">
        <ParticipantList />
        <CardPicker />
      </div>
    </div>
  );
}
