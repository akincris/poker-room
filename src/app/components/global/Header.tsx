"use client";
import { Icon } from "@/app/utils/Icons";
import { toggleTheme } from "@/app/utils/theme";
import Link from "next/link";

export const Header = () => {
  return (
    <header className="gap-4 w-full h-16 rounded-2xl [&_svg]:opacity-50 [&_svg]:hover:opacity-100 [&_svg]:duration-300 [&_svg]:transition-opacity py-2 px-4 pl-6 top-0 md:top-4 z-10 shadow-[inset_4px_4px_15px_rgba(255,255,255,0.40)] text-white flex items-center sticky">
      <div className="flex gap-1 justify-between w-full">
        <div className="gap-2 flex">
          <Link href="/" className="justify-center flex items-center gap-1">
            <Icon name="poker" />
            <h2 className="md:text-xl font-bold uppercase hidden xs:block">
              Poker
            </h2>
          </Link>
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
          <button className="cursor-pointer">
            <Icon name="exit" />
          </button>
        </div>
      </div>
    </header>
  );
};
