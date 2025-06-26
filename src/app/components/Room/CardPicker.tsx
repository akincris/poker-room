"use client";
import { cards } from "@/app/utils/cards";
import { Icon } from "@/app/utils/Icons";
import { useEffect, useState } from "react";

export const CardPicker = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [availableCards, setAvailableCards] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const pickCard = () => {
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
  };

  useEffect(() => {
    setAvailableCards(cards);
  }, []);

  useEffect(() => {}, [selected]);
  const handleVote = () => {
    setSubmitted(true);
  };

  return (
    <div
      data-loading={submitted}
      className="flex group flex-col items-center w-full data-[loading=true]:animate-pulse"
    >
      <div className="group-data-[loading=true]:opacity-100 opacity-0">Awaiting other players to vote...</div>
      <button
        disabled={!selected}
        onClick={handleVote}
        className="rounded-2xl group-data-[loading=true]:opacity-0 group-data-[loading=true]:h-0 transition-all hover:border-white dark:hover:text-[#9767b8] dark:hover:border-[#9767b8] hover:text-white duration-300 cursor-pointer 
          border w-full lg:w-80 font-semibold text-white !border-white disabled:opacity-50 disabled:cursor-not-allowed h-16"
      >
        Vote
      </button>
      <div className="flex flex-wrap gap-4 justify-center my-10">
        {availableCards.map((card, index) => (
          <div
            key={index}
            data-disabled={submitted}
            onClick={() => setSelected(card)}
            className={`text-6xl p-7 lg:p-12 data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-30 2xl:p-20 h-[160px] items-center justify-center cursor-pointer hover:!border-poker-900 border-2 rounded-xl transition duration-200
              ${selected === card && "!border-poker-900 scale-110"}
            `}
          >
            <Icon name="poker" styles="size-10 opacity-50" />
          </div>
        ))}
      </div>
    </div>
  );
};
