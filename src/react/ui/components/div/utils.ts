import { HTMLAttributes, ReactNode, Ref } from "react";

export interface IDiv extends HTMLAttributes<HTMLHeadingElement> {
  ref?: Ref<HTMLHeadingElement>;
  text?: string | number;
  className?: string;
  children?: ReactNode;
}
