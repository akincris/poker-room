"use client";
import { cards } from "@/app/utils/cards";
import { useEffect, useState } from "react";

export const CardPicker = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [availableCards, setAvailableCards] = useState([]);

  const pickCard = () => {
    const randomCard = cards[Math.floor(Math.random() * cards.length)];
  };

  useEffect(() => {}, [selected]);

  return (
    <div className="flex flex-col items-center w-full gap-16">
      <h2 className="text-white text-xl font-bold">Pick a Card</h2>
      <div className="flex flex-wrap gap-4 justify-center">
        {cards.map((card, index) => (
          <div
            key={index}
            onClick={() => setSelected(card)}
            className={`text-6xl p-7 lg:p-12 2xl:p-20 cursor-pointer hover:!border-poker-900 border-2 rounded-xl transition duration-200
              ${selected === card && "!border-poker-900 scale-110 bg-black/20"}
            `}
          >
            {card}
          </div>
        ))}
      </div>
      {selected && (
        <button
          type="submit"
          className="rounded-2xl hover:border-white dark:hover:text-[#9767b8] dark:hover:border-[#9767b8] hover:text-white duration-300 transition-colors cursor-pointer 
          border w-full lg:w-80 items-center flex py-5 px-4 gap-2.5 justify-center font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Vote
        </button>
      )}
    </div>
  );
};
