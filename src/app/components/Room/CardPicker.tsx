"use client";
import { cards } from "@/app/utils/cards";
import { Icon } from "@/app/utils/Icons";
import { updatePlayerData } from "@/lib/features/player-slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { socket } from "@/socket";
import { useState } from "react";

export const CardPicker = () => {
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const player = useAppSelector((state) => state.player);
  const [selected, setSelected] = useState<number | null>(null);
  const { id: roomId, players } = useAppSelector((state) => state.room);

  const handleVote = () => {
    if (selected == undefined) return;

    setLoading(true);
    socket.emit("playerVote", {
      roomId,
      player: { ...player, vote: selected },
    });
    dispatch(updatePlayerData({ ...player, vote: selected }));
  };

  return (
    <div
      data-loading={loading}
      className="flex fade-in group overflow-hidden flex-col items-center w-full data-[loading=true]:animate-pulse"
    >
      <div className="group-data-[loading=true]:opacity-100 opacity-0">
        Awaiting other players to vote...
      </div>
      <button
        disabled={selected == null}
        onClick={handleVote}
        className="rounded-2xl group-data-[loading=true]:opacity-0 group-data-[loading=true]:h-0 transition-all hover:border-white dark:hover:text-[#9767b8] dark:hover:border-[#9767b8] hover:text-white duration-300 cursor-pointer 
          border w-full lg:w-80 font-semibold text-white !border-white disabled:opacity-50 disabled:cursor-not-allowed h-16"
      >
        Vote
      </button>
      <div className="flex flex-wrap gap-4 justify-center my-10">
        {cards.map((_, index) => {
          const votedByOtherPlayers = !!players
            .filter((p) => p.name != player.name)
            .find((p) => p.vote == index);

          const disabled = loading || votedByOtherPlayers;
          return (
            <div
              key={index}
              data-disabled={disabled}
              data-selected={selected == index}
              data-not-selectable={votedByOtherPlayers}
              onClick={() => !disabled && setSelected(index)}
              className="text-6xl p-7 lg:p-12 data-[disabled=true]:border-2 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-60 2xl:p-20
              max-h-[160px] items-center justify-center cursor-pointer hover:!border-poker-900 border rounded-xl transition 
             duration-200 data-[selected=true]:!border-poker-900 data-[selected=true]:border-[3px] data-[selected=true]:scale-110
              data-[not-selectable=true]:!border-red-500
            "
            >
              <Icon name="poker" styles="size-10" />
            </div>
          );
        })}
      </div>
    </div>
  );
};
