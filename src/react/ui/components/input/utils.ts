import { InputHTMLAttributes } from 'react';
import { cva, VariantProps } from 'class-variance-authority';

export interface IInput
	extends InputHTMLAttributes<HTMLInputElement>,
		VariantProps<typeof inputVariants> {
	className?: string;
	isInvalid?: boolean;
}

export const inputVariants = cva(
	'block w-full rounded-lg px-4 min-h-8 max-h-8 py-3 text-sm placeholder:text-neutral-500 disabled:bg-neutral-300 disabled:dark:!bg-neutral-800',
	{
		variants: {
			variant: {
				solid: 'bg-neutral-200 dark:bg-neutral-900 border border-neutral-300 dark:border-neutral-700 focus:border-neutral-400',
				invalid: 'border-red-500 focus:border-red-500 dark:border-red-500',
			},
		},
		defaultVariants: {
			variant: 'solid',
		},
	},
);
