import { cn } from "../../utils";
import { IText, textVariants } from "./utils";

export const Text = ({ className, text, variant = "default", children, ...props }: IText) => (
  <span className={cn("m-0 p-0", textVariants[variant], className)} {...props}>
    {text || children}
  </span>
);
