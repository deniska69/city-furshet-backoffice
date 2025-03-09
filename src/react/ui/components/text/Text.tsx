import { HTMLAttributes, ReactNode, Ref } from 'react';

import { cn } from '../../utils';

interface IText extends HTMLAttributes<HTMLSpanElement> {
	ref?: Ref<HTMLSpanElement>;
	text?: string | number;
	className?: string;
	children?: ReactNode;
	variant?: 'default' | 'muted' | 'primary';
}

const textVariants = {
	default: 'text-text-light dark:text-text-dark',
	muted: 'text-muted-light dark:text-muted-dark',
	primary: 'text-primary',
};

export const Text = ({ className, text, variant = 'default', children, ...props }: IText) => (
	<span className={cn('m-0 p-0', textVariants[variant], className)} {...props}>
		{text || children}
	</span>
);
