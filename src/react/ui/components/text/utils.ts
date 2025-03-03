import { HTMLAttributes, ReactNode, Ref } from "react";

type TypeTextVariants = "default" | "muted";

export const textVariants = {
  default: "text-black dark:text-white",
  muted: "text-muted-light dark:text-muted-dark",
};

export interface IText extends HTMLAttributes<HTMLSpanElement> {
  ref?: Ref<HTMLSpanElement>;
  text?: string | number;
  className?: string;
  children?: ReactNode;
  variant?: TypeTextVariants;
}
