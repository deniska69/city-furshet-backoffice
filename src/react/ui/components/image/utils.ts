import { SyntheticEvent, ImgHTMLAttributes } from "react";
import errorImagePlaceholder from "./noimage.svg";

export interface IImage extends ImgHTMLAttributes<HTMLImageElement> {
  src?: string;
  alt?: string;
  className?: string;
}

export const getImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  e.currentTarget.src = errorImagePlaceholder;
};
