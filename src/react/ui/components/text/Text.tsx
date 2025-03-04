import { HTMLAttributes, ReactNode, Ref } from 'react';

import { cn } from '../../utils';

type TypeTextVariants = 'default' | 'muted';

interface IText extends HTMLAttributes<HTMLSpanElement> {
	ref?: Ref<HTMLSpanElement>;
	text?: string | number;
	className?: string;
	children?: ReactNode;
	variant?: TypeTextVariants;
}

const textVariants = {
	default: 'text-black dark:text-white',
	muted: 'text-muted-light dark:text-muted-dark',
};

export const Text = ({ className, text, variant = 'default', children, ...props }: IText) => (
	<span className={cn('m-0 p-0', textVariants[variant], className)} {...props}>
		{text || children}
	</span>
);
