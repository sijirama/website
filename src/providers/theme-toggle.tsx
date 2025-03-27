"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { FaRegCircle } from "react-icons/fa";

export function ThemeToggle() {
  const { setTheme, themes, theme } = useTheme();

  const onclick = () => {
    return;
    const newTheme = themes.filter((t) => {
      return t !== theme && t !== "system";
    });
    setTheme(newTheme[0]);
  };

  return (
    <div onClick={onclick} className="cursor-pointer p-1">
      <FaRegCircle
        onClick={onclick}
        className="text-lg text-black dark:text-zinc-200 font-semibold"
      />
    </div>
  );
}
