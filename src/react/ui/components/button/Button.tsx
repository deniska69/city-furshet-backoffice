import { cn } from '../../utils';
import { buttonVariants, IButton } from './utils';

export const Button = (props: IButton) => {
	const { className, text, children, variant = 'lime', ...rest } = props;
	return (
		<button
			className={cn(buttonVariants['default'], buttonVariants[variant], className)}
			{...rest}
		>
			{text || children}
		</button>
	);
};
