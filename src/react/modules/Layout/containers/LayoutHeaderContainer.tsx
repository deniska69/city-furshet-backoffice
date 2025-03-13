import { useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/16/solid';
import { FolderOpenIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react';

import { getLastModText, openBackupdDir } from '@helpers';
import { priceStore } from '@stores';
import { Button, Card, cn, HStack, Span } from '@ui';

import LayoutThemeWidget from './LayoutThemeWidget';

const Component = () => {
	useEffect(() => {
		handleConnect();
	}, []);

	const lastMod = getLastModText(priceStore.lastMod);

	const handleConnect = () => priceStore.electronConnect();

	const handleGetPice = () => priceStore.electronGetPrice();

	return (
		<Card
			className={cn(
				'max-h-16 min-h-16 w-full !rounded-none',
				'border-x-0 border-t-0 border-b',
				'flex flex-row justify-end gap-x-6 !px-6 !py-0 items-center',
			)}
		>
			{lastMod ? (
				<HStack
					className={cn(
						'!pr-6 min-h-[40px] items-center gap-x-3',
						'border-r border-y-0 border-l-0',
						'border-border-light dark:border-border-dark border',
					)}
				>
					<Span className="text-sm">
						Последнее изменение прайса: {lastMod}
					</Span>
					<Button
						variant="ghost"
						onClick={openBackupdDir}
						className="!px-1.5 !py-4 !rounded-full"
					>
						<FolderOpenIcon className="w-5" />
					</Button>
				</HStack>
			) : null}

			{priceStore.isConnect && !priceStore.price ? (
				<Button onClick={handleGetPice} text="Получить прайс" />
			) : null}

			{!priceStore.isConnect ? (
				<Button onClick={handleConnect} text="Подключиться к хостингу" />
			) : null}

			<HStack
				className={cn(
					'!pr-6 min-h-[40px] flex items-center gap-x-3',
					'border-r border-y-0 border-l-0',
					'bg-card-bg-light dark:bg-card-bg-dark',
					'border-border-light dark:border-border-dark border',
				)}
			>
				<Span className="text-sm">Статус подключения к хостингу:</Span>
				{priceStore.isConnect ? (
					<CheckCircleIcon className="text-primary !mt-1 w-5" />
				) : (
					<XCircleIcon className="!mt-1 w-5 text-red-500" />
				)}
			</HStack>

			<LayoutThemeWidget />
		</Card>
	);
};

const LayoutHeaderContainer = observer(Component);

export default LayoutHeaderContainer;
