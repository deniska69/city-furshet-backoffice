import { HTMLAttributes, ReactNode, Ref } from 'react';

import { cn } from '../../utils';

interface ISpan extends HTMLAttributes<HTMLSpanElement> {
	ref?: Ref<HTMLSpanElement>;
	text?: string | number;
	className?: string;
	children?: ReactNode;
	variant?: 'default' | 'muted' | 'primary';
}

const spanVariants = {
	default: 'text-text-light dark:text-text-dark',
	muted: 'text-muted-light dark:text-muted-dark',
	primary: 'text-primary',
};

export const Span = ({ className, text, variant = 'default', children, ...props }: ISpan) => (
	<span className={cn('m-0 p-0', spanVariants[variant], className)} {...props}>
		{text || children}
	</span>
);
