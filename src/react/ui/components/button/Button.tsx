import { cn } from '../../utils';
import { buttonVariants, IButton } from './utils';

export const Button = (props: IButton) => {
	const { type = 'button', className, text, children, variant, ...rest } = props;
	return (
		<button className={cn(buttonVariants({ variant }), className)} type={type} {...rest}>
			{text || children}
		</button>
	);
};
