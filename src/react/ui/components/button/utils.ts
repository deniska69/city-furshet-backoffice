import { ButtonHTMLAttributes, ReactNode, Ref } from 'react';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	ref?: Ref<HTMLButtonElement>;
	variant?: 'lime' | 'orange' | 'muted';
	className?: string;
	text?: string;
	children?: ReactNode;
}

export const buttonVariants = {
	default:
		'!py-3 !px-6 m-0 inline-flex cursor-pointer items-center justify-center gap-x-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50 rounded-lg border border-transparent text-sm font-medium text-white max-h-8',
	lime: 'bg-primary-lime hover:bg-primary-lime-muted focus:bg-primary-lime-muted',
	orange: 'bg-primary-orange hover:bg-primary-orange-muted focus:bg-primary-orange-muted',
	muted: 'bg-gray-100 hover:bg-neutral-300/70 !text-text-light dark:bg-neutral-700 hover:dark:bg-neutral-700/70 dark:!text-muted-dark',
};

export const buttonColors = {};
