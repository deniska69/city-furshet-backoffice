import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/16/solid';
import { hostingStore } from '@stores';
import { Button, Card, cn, HStack, Text } from '@ui';
import { observer } from 'mobx-react';
import { useEffect } from 'react';

const Component = () => {
	useEffect(() => {
		handleConnect();
	}, []);

	const handleConnect = () => hostingStore.connect();

	return (
		<Card
			className={cn(
				'max-h-16 min-h-16 w-full',
				'border-x-0 border-t-0 border-b',
				'flex flex-row justify-end gap-x-6 !px-6 !py-3',
			)}
		>
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

const Header = observer(Component);

export default Header;
