import { cn } from "../../utils";
import { Div } from "../div/Div";
import { IDiv } from "../div/utils";

export const HStack = ({ className, ...props }: IDiv) => <Div className={cn("flex flex-row", className)} {...props} />;
