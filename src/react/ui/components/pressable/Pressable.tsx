import { ButtonHTMLAttributes, MouseEvent, ReactNode, Ref } from 'react';

import { cn } from '../../utils';

interface IPressable extends ButtonHTMLAttributes<HTMLButtonElement> {
	ref?: Ref<HTMLButtonElement>;
	className?: string;
	children?: ReactNode;
	onClick?: () => void;
}

export const Pressable = ({ className, children, onClick, ...props }: IPressable) => {
	const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		if (onClick) onClick();
	};

	return (
		<button
			className={cn('inline-flex cursor-pointer', className)}
			onClick={handleClick}
			{...props}
		>
			{children}
		</button>
	);
};
