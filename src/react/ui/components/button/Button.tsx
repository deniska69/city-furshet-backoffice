import { cn } from '../../utils';
import { buttonVariants, IButton } from './utils';

export const Button = (props: IButton) => {
	const { className, text, children, variant, ...rest } = props;
	return (
		<button className={cn(buttonVariants({ variant }), className)} {...rest}>
			{text || children}
		</button>
	);
};
