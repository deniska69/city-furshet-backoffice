import { cn } from "../../utils";
import { getImageError, IImage } from "./utils";

export const Image = ({ src, alt, className, ...props }: IImage) => (
  <img src={src} className={cn("", className)} alt={alt || src} onError={getImageError} {...props} />
);
