import { cn } from '../../utils';

interface IDivider {
	className?: string;
}

export const Divider = ({ className }: IDivider) => (
	<hr className={cn('border-border-light dark:border-border-dark', className)} />
);
