import { cn } from "../../utils";
import { Div } from "../div/Div";
import { IDiv } from "../div/utils";

export const Stack = ({ className, ...props }: IDiv) => <Div className={cn("flex flex-col", className)} {...props} />;
