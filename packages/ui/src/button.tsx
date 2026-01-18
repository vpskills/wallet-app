"use client";

import { ReactNode, ButtonHTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  appName?: string;
}

export const Button = ({ children, className, appName, ...props }: ButtonProps) => {
  return (
    <button
      className={twMerge('bg-pink-600 hover:bg-pink-700 text-white font-bold rounded-md px-4 py-2 outline-none', className)}
      {...props}
    >
      {children}
    </button>
  );
};
