import { cn, Div, Spinner } from '@ui';

export const Loader = ({ className }: { className?: string }) => (
	<Div
		className={cn(
			'absolute flex h-full min-w-full items-center justify-center bg-white/10 backdrop-blur-md z-50',
			className,
		)}
	>
		<Spinner className="fill-primary shadow-lime w-20" />
	</Div>
);
