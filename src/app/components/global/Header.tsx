"use client";
import { Icon } from "@/app/utils/Icons";
import { toggleTheme } from "@/app/utils/theme";
import { useAppSelector } from "@/lib/hooks";
import { socket } from "@/socket";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const { player, room } = useAppSelector((state) => state);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      data-scrolled={scrolled}
      className="gap-4 w-full data-[scrolled=true]:bg-poker-50/80 dark:data-[scrolled=true]:bg-poker-200/90 dark:data-[scrolled=true]:text-poker-50 data-[scrolled=true]:text-poker-200
       duration-300 transition-colors h-16 rounded-2xl [&_svg]:opacity-50 [&_svg]:hover:opacity-100 
    [&_svg]:duration-300 [&_svg]:transition-opacity py-2 px-4 pl-6 top-0 md:top-4 z-10 
    shadow-[inset_4px_4px_15px_rgba(255,255,255,0.40)] text-white flex items-center sticky"
    >
      <div className="flex gap-1 justify-between w-full">
        <div className="gap-2 flex">
          <Icon name="poker" />
        </div>
        <div className="flex gap-4">
          <button className="cursor-pointer" onClick={toggleTheme}>
            <Icon
              name="light"
              styles="flip-y-show dark:flip-y-hide dark:hidden"
            />
            <Icon
              name="dark"
              styles="flip-y-hide hidden dark:flip-y-show dark:block"
            />
          </button>
          <button
            className="cursor-pointer"
            onClick={() => {
              socket.emit("playerDisconnect", { roomId: room.id, player });
              redirect("/");
            }}
          >
            <Icon name="exit" />
          </button>
        </div>
      </div>
    </header>
  );
};
