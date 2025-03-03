import { cn } from "../../utils";
import { IDivider } from "./utils";

export const Divider = ({ className }: IDivider) => (
  <hr className={cn("border-neutral-300 dark:border-neutral-700", className)} />
);
