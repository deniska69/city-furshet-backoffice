import { cn } from "../../utils";
import { IInput } from "./utils";

export const Input = ({ className, isInvalid, ...props }: IInput) => (
  <input
    className={cn(
      "block w-full rounded-lg border border-[#e5e7eb] bg-neutral-100 px-4 py-3 text-sm placeholder:text-neutral-500 focus:border-neutral-400 dark:border-neutral-700 dark:bg-neutral-900",
      isInvalid && "border-red-500 focus:border-red-500 dark:border-red-500",
      className
    )}
    {...props}
  />
);
