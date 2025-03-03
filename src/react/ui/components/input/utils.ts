import { InputHTMLAttributes } from "react";

export interface IInput extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  isInvalid?: boolean;
}
