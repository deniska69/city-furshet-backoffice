import { observer } from 'mobx-react';

import { Card, Divider, Form, HStack, Input, Stack, Text, Textarea } from '@ui';

const Component = (props: unknown) => {
	console.log(props);
	return (
		<Card className="w-full">
			<Stack className="gap-y-3">
				<Text className="text-bold text-2xl">Редактор категории</Text>
				<Divider />
			</Stack>

			<Form className="gap-y-3 !mt-6">
				<HStack className="max-w-[600px] gap-x-3 items-center">
					<Text className="min-w-24" variant="muted">
						ID:
					</Text>
					<Input className="" disabled />
				</HStack>
				<HStack className="max-w-[600px] gap-x-3 items-center">
					<Text className="min-w-24">Название:</Text>
					<Input className="" />
				</HStack>
				<HStack className="max-w-[600px] gap-x-3 items-start">
					<Text className="min-w-24 mt-1">Описание:</Text>
					<Textarea className="" />
				</HStack>
			</Form>
		</Card>
	);
};

export const FormsCategoryScreen = observer(Component);
