import { ImgHTMLAttributes, SyntheticEvent } from 'react';

import { cn } from '../../utils';
import errorImagePlaceholder from './noimage.svg';

interface IImage extends ImgHTMLAttributes<HTMLImageElement> {
	src?: string;
	alt?: string;
	className?: string;
	onError?: () => void;
}

const getImageError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
	e.currentTarget.src = errorImagePlaceholder;
};

export const Image = ({ src, alt, className, onError, ...props }: IImage) => {
	const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
		getImageError(e);
		if (onError) onError();
	};

	return (
		<img
			src={src && src?.length > 0 ? src : errorImagePlaceholder}
			className={cn('', className)}
			alt={alt || src}
			onError={handleError}
			{...props}
		/>
	);
};
