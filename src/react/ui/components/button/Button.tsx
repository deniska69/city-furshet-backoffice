import { cn } from '../../utils';
import { IButton, buttonVariants } from './utils';

export const Button = (props: IButton) => {
	const { ref, className, text, children, variant = 'lime', ...rest } = props;
	return (
		<button
			ref={ref}
			className={cn(buttonVariants['default'], buttonVariants[variant], className)}
			{...rest}
		>
			{text || children}
		</button>
	);
};
