import { cn } from '../../utils';
import { IInput, inputVariants } from './utils';

export const Input = ({ className, variant, isInvalid, ...props }: IInput) => (
	<input
		type="text"
		className={cn(
			inputVariants({ variant }),
			isInvalid && inputVariants({ variant: 'invalid' }),
			className,
		)}
		{...props}
	/>
);
