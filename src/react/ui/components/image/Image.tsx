import { ImgHTMLAttributes, SyntheticEvent } from 'react';

import { cn } from '../../utils';
import errorImagePlaceholder from './noimage.svg';

interface IImage extends ImgHTMLAttributes<HTMLImageElement> {
	src?: string;
	alt?: string;
	className?: string;
}

const getImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
	e.currentTarget.src = errorImagePlaceholder;
};

export const Image = ({ src, alt, className, ...props }: IImage) => (
	<img
		src={src && src?.length > 0 ? src : errorImagePlaceholder}
		className={cn('', className)}
		alt={alt || src}
		onError={getImageError}
		{...props}
	/>
);
