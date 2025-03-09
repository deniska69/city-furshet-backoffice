import { observer } from 'mobx-react';

import { hostingStore } from '@stores';
import { Button, Card, cn, Stack, Text } from '@ui';

import LayoutLogo from '../components/LayoutLogo';

const Component = () => {
	return (
		<Card className="h-screen max-w-64 min-w-64 !px-4 border-y-0 border-r border-l-0 flex flex-col">
			<LayoutLogo />

			<Stack
				className={cn(
					'h-full gap-y-3',
					!hostingStore.isPrice || (hostingStore.isPrice && !hostingStore.categories)
						? 'justify-center'
						: 'justify-start',
				)}
			>
				{!hostingStore.isPrice ? (
					<Text variant="muted" className="text-center">
						Для отображения категорий необходимо открыть прайс
					</Text>
				) : null}

				{hostingStore.isPrice && !hostingStore.categories ? (
					<Text variant="muted" className="text-center">
						В прайсе нет найденных категорий, нажмите на кнопку добавить:
					</Text>
				) : null}

				{hostingStore.isPrice && !hostingStore.categories ? (
					<Button variant="muted" className="text-center" text="+" />
				) : null}
			</Stack>
		</Card>
	);
};

const LayoutSidebarContainer = observer(Component);

export default LayoutSidebarContainer;
