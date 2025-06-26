"use client";
import React, { useEffect, useState } from "react";
import { CardPicker } from "../../components/Room/CardPicker";
import { ParticipantList } from "../../components/Room/Participants";
import { socket } from "@/socket";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { updateRoomData } from "@/lib/features/room-slice";
import { redirect } from "next/navigation";
import { IRoom } from "@/app/interfaces/room";
import { cards } from "@/app/utils/cards";

export default function Room({ params }: any) {
  const dispatch = useAppDispatch();
  const { id }: { id: string } = React.use(params);
  const player = useAppSelector((state) => state.player);
  const { players } = useAppSelector((state) => state.room);
  const minPlayersPerRoom = parseInt(
    process.env.NEXT_PUBLIC_MIN_PLAYERS_PER_ROOM || "3"
  );

  const [hidePicker, setHidePicker] = useState(false);

  useEffect(() => {
    if (!player.name) redirect("/");

    socket.on("roomData", (room: IRoom) => {
      if (!room || !player.name) redirect("/");
      dispatch(updateRoomData(room));
    });
  }, []);

  useEffect(() => {
    const handleGameExit = () => {
      socket.emit("playerDisconnect", { roomId: id, player });
    };

    window.addEventListener("beforeunload", handleGameExit);

    return () => {
      window.removeEventListener("beforeunload", handleGameExit);
    };
  }, []);

  useEffect(() => {
    const cardReveal =
      minPlayersPerRoom <= players?.length &&
      !players.find((p) => p.vote == undefined);

    setTimeout(() => setHidePicker(cardReveal), 300);
  }, [players]);

  return (
    <div className="flex flex-col gap-10 pt-2 items-center">
      <h4 className="text-2xl lg:text-4xl font-semibold opacity-50">
        Room [{id}]
      </h4>

      <div className="flex w-full gap-4 relative">
        <ParticipantList />
        <div
          data-reveal={
            minPlayersPerRoom <= players?.length &&
            !players.find((p) => p.vote == undefined)
          }
          className="group w-full flex flex-col items-center"
        >
          {!hidePicker ? (
            <div className="grid overflow-hidden transition-all duration-300 group-data-[reveal=true]:opacity-0 opacity-100 group-data-[reveal=true]:grid-rows-[0fr] grid-rows-[1fr]">
              <CardPicker />
            </div>
          ) : (
            <div className="cursor-pointer text-[250px] leading-[250px] lg:text-[500px] lg:leading-[490px] flip-y-hide group-data-[reveal=true]:flip-y-show">
              {cards[player.vote as any]}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
