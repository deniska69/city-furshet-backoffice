import { ButtonHTMLAttributes, ReactNode, Ref } from "react";

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  ref?: Ref<HTMLButtonElement>;
  variant?: "solid" | "ghost" | "link";
  className?: string;
  text?: string;
  children?: ReactNode;
}

export const buttonVariants = {
  default:
    "py-3 px-6 m-0 inline-flex cursor-pointer items-center justify-center gap-x-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50",
  solid:
    "rounded-lg border border-transparent bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:bg-blue-700",
  link: "dark:text-white hover:underline",
  ghost:
    "inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent text-primary-light hover:bg-blue-100 hover:text-blue-800 disabled:opacity-50 disabled:pointer-events-none dark:text-primary-dark dark:hover:bg-blue-800/30 dark:hover:text-blue-400",
};
