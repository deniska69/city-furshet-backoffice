import { useEffect } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/16/solid';
import { observer } from 'mobx-react';

import { getLastModText } from '@helpers';
import { hostingStore } from '@stores';
import { Button, Card, cn, Div, HStack, Text } from '@ui';

const Component = () => {
	useEffect(() => {
		handleConnect();
	}, []);

	const lastMod = getLastModText(hostingStore.lastMod);

	const handleConnect = () => hostingStore.connect();

	const handleGetPice = () => hostingStore.getPrice();

	return (
		<Card
			className={cn(
				'max-h-16 min-h-16 w-full',
				'border-x-0 border-t-0 border-b',
				'flex flex-row justify-end gap-x-6 !px-6 items-center',
			)}
		>
			{lastMod ? (
				<Div
					className={cn(
						'!pr-6 min-h-[50px] flex items-center',
						'border-r border-y-0 border-l-0',
						'bg-card-bg-light dark:bg-card-bg-dark',
						'border-border-light dark:border-border-dark border',
					)}
				>
					<Text>Последнее изменение прайса: {lastMod}</Text>
				</Div>
			) : null}

			{hostingStore.isConnect && !hostingStore.isPrice ? (
				<Button onClick={handleGetPice} text="Получить прайс" />
			) : null}

			{!hostingStore.isConnect ? (
				<Button onClick={handleConnect} text="Подключиться к хостингу" />
			) : null}

			<HStack className="items-center gap-x-3">
				<Text>Статус подключения к хостингу:</Text>
				{hostingStore.isConnect ? (
					<CheckCircleIcon className="text-primary-lime !mt-1 w-5" />
				) : (
					<XCircleIcon className="!mt-1 w-5 text-red-500" />
				)}
			</HStack>
		</Card>
	);
};

const LayoutHeader = observer(Component);

export default LayoutHeader;
