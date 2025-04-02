import { CheckBadgeIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react';

import { layoutStore } from '@stores';
import { Button, cn, Div, HStack, Span, Stack } from '@ui';

const variants = {
	success: 'bg-green-600/60 dark:bg-green-600/20 border-green-700 dark:border-green-900',
	warning: 'bg-red-800/40 dark:bg-red-600/20 border-red-900 dark:border-red-900',
};

const Component = () => {
	if (!layoutStore.alertText || !layoutStore.alertType) return null;

	const buttons = layoutStore.alertButtons || [];

	return (
		<Stack className="bg-bg-dark/50 backdrop-blur-xs absolute z-51 flex h-screen w-full items-center justify-center">
			{layoutStore.alertType === 'success' ? (
				<CheckBadgeIcon className="w-32 text-white" />
			) : (
				<InformationCircleIcon className="w-32 text-white" />
			)}

			<Span className="block text-center text-4xl font-bold text-white">Внимание</Span>

			<Div
				className={cn(
					'!p-4 !mt-6 rounded-xl border max-w-[60%] text-center',
					variants[layoutStore.alertType],
				)}
			>
				<Span className="!mt-6 text-white whitespace-pre-line text-center">
					{layoutStore.alertText}
				</Span>
			</Div>

			<HStack className="gap-x-3 mt-4">
				{buttons.map((el, index) => (
					<Button key={index} text={el.title} onClick={el.onClick} />
				))}
			</HStack>
		</Stack>
	);
};

const LayoutAlertScreen = observer(Component);
export default LayoutAlertScreen;
