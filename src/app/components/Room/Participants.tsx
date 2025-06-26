"use client";
import { Icon } from "@/app/utils/Icons";
import { useAppSelector } from "@/lib/hooks";
import { useState } from "react";

export const ParticipantList = () => {
  const [visible, setVisible] = useState(true);
  const { players } = useAppSelector((state) => state.room);
  const player = useAppSelector((state) => state.player);

  return (
    <div
      data-visible={!!visible}
      className="space-y-5 group text-xs lg:text-base"
    >
      <button onClick={() => setVisible(!visible)} className="cursor-pointer p-2 border rounded-full">
        <Icon
          name="menu"
          styles="-rotate-90 duration-300 transition-transform group-data-[visible=true]:rotate-90 size-5"
        />
      </button>
      <div
        data-visible={!!visible}
        className="w-0 overflow-hidden transition-all duration-300 lg:group-data-[visible=true]:w-[340px] group-data-[visible=true]:w-[150px]"
      >
        <div className="rounded-2xl border p-2.5 lg:p-4 space-y-4 font-bold shadow-[inset_4px_4px_15px_rgba(255,255,255,0.40)]">
          <h3 className="text-violet-50">Players</h3>
          <hr className="!border-violet-50" />
          <div
            className="flex flex-col gap-3 transition-[max-height] duration-500 overflow-hidden"
            style={{ maxHeight: `${players?.length * 64}px` }}
          >
            {players.map(({ name, vote }, index) => (
              <div
                key={index}
                data-voted={vote != undefined}
                className="text-white items-center group/participant flex justify-between p-2 lg:p-3 cursor-pointer border hover:!border-poker-900 hover:text-poker-900 transition-colors duration-300 rounded-2xl !border-white"
              >
                <div className="space-x-2">
                  <span>{name}</span>
                  {player.name == name && <b className="text-xs">(You)</b>}
                </div>

                <Icon
                  name="check"
                  styles="fill-white size-4 group-data-[voted=true]/participant:opacity-100 opacity-0 duration-300 transition-all"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
