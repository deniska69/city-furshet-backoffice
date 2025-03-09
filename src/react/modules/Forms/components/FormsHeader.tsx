import { XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router';

import { Button, Divider, HStack, Stack, Text } from '@ui';

const FormsHeader = () => {
	const navigate = useNavigate();

	return (
		<Stack className="gap-y-3">
			<HStack className="items-center justify-between">
				<Text className="text-bold text-2xl">Редактор категории</Text>
				<Button
					variant="ghost"
					onClick={() => navigate(-1)}
					className="!px-1.5 !py-4 !rounded-full"
				>
					<XMarkIcon className="w-5" />
				</Button>
			</HStack>
			<Divider />
		</Stack>
	);
};

export default FormsHeader;
