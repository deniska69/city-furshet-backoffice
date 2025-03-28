import { TextareaHTMLAttributes } from 'react';
import { VariantProps } from 'class-variance-authority';

import { cn } from '../../utils';
import { inputVariants } from '../input';

interface ITextarea
	extends TextareaHTMLAttributes<HTMLTextAreaElement>,
		VariantProps<typeof inputVariants> {
	className?: string;
	isInvalid?: boolean;
}

export const Textarea = ({ className, variant, isInvalid, ...props }: ITextarea) => (
	<textarea
		className={cn(
			inputVariants({ variant }),
			isInvalid && inputVariants({ variant: 'invalid' }),
			'min-h-[100px] max-h-[200px]',
			className,
		)}
		{...props}
	/>
);
