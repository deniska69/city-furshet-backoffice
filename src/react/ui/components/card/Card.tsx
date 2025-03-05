import { cn, Div } from '@ui';
import { IDiv } from '../div/utils';

export const Card = ({ className, children, ...props }: IDiv) => (
	<Div
		className={cn(
			'bg-card-bg-light dark:bg-card-bg-dark',
			'border-border-light dark:border-border-dark border',
			className,
		)}
		{...props}
	>
		{children}
	</Div>
);
