import { ReactNode } from 'react';

import { cn } from '../../utils';
import { Div } from '../div';

interface ISwitch {
	value: boolean;
	onChange: (value: boolean) => void;
	className?: string;
	iconChecked?: ReactNode;
	iconUnChecked?: ReactNode;
}

export const Switch = (props: ISwitch) => (
	<div
		className={cn(
			`h-6 w-12`,
			'relative flex cursor-pointer items-center overflow-hidden rounded-full',
			'transition-all duration-200',
			'bg-neutral-400',
			{ 'dark:!bg-primary-lime': props.value },
			props.className,
		)}
		onClick={() => props.onChange(!props.value)}
	>
		{props?.iconChecked ? <Div className="absolute left-2">{props?.iconChecked}</Div> : null}
		{props?.iconUnChecked ? <Div className="absolute right-2">{props?.iconUnChecked}</Div> : null}

		<span
			className={cn(
				`h-6 w-6`,
				'z-1 flex rounded-full',
				'shadow-lg shadow-black/50',
				'transition-all duration-200',
				'border border-neutral-400 dark:border-primary-lime',
				'bg-white dark:bg-white',
				{ '!ml-6': props.value },
			)}
		/>
	</div>
);
