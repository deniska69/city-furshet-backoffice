import { ButtonHTMLAttributes, ReactNode, Ref } from 'react';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
	ref?: Ref<HTMLButtonElement>;
	variant?: 'lime' | 'orange';
	className?: string;
	text?: string;
	children?: ReactNode;
}

export const buttonVariants = {
	default:
		'!py-3 !px-6 m-0 inline-flex cursor-pointer items-center justify-center gap-x-2 focus:outline-none disabled:pointer-events-none disabled:opacity-50 rounded-lg border border-transparent text-sm font-medium text-white',
	lime: 'bg-primary-lime hover:bg-primary-lime-muted focus:bg-primary-lime-muted max-h-[40px]',
	orange: 'bg-primary-orange hover:bg-primary-orange-muted focus:bg-primary-orange-muted',
};

export const buttonColors = {};
