import { ButtonHTMLAttributes, ReactNode, Ref } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

export interface IButton
	extends ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	ref?: Ref<HTMLButtonElement>;
	className?: string;
	text?: string;
	children?: ReactNode;
}

export const buttonVariants = cva(
	'py-3 px-6 m-0 inline-flex cursor-pointer items-center justify-center gap-x-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50 rounded-lg border border-transparent text-sm font-medium text-white max-h-8',
	{
		variants: {
			variant: {
				ghost: '!text-text-light hover:bg-gray-200 dark:!text-text-dark dark:hover:bg-neutral-700 ',
				'ghost-primary': '!text-primary hover:bg-primary/20',
				link: 'text-text-light dark:text-text-dark hover:underline hover:!text-primary dark:hover:!text-primary',
				outline:
					'border-gray-200 text-gray-500 hover:border-primary hover:text-primary focus:outline-hidden focus:border-primary focus:text-primary dark:border-neutral-700 dark:text-neutral-400 dark:hover:text-primary dark:hover:border-primary dark:focus:text-primary dark:focus:border-primary',
				solid: 'bg-primary dark:bg-primary hover:bg-primary/60 dark:hover:bg-primary/60',
				muted: 'bg-gray-200 hover:bg-neutral-300/70 dark:bg-neutral-700 hover:dark:bg-neutral-700/70 !text-neutral-500 dark:!text-neutral-300',
				error: 'bg-red-500 dark:bg-red-900 hover:bg-red-500/60 dark:hover:bg-red-900/60',
			},
		},
		defaultVariants: {
			variant: 'solid',
		},
	},
);
