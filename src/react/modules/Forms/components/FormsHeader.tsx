import { XMarkIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router';

import { TypePriceCategory } from '@types';
import { Button, Divider, HStack, Stack, Text } from '@ui';

const FormsHeader = ({ id }: { id?: TypePriceCategory['category_id'] }) => {
	const navigate = useNavigate();

	return (
		<Stack className="gap-y-3">
			<HStack className="items-center justify-between">
				<HStack className="gap-x-1">
					<Text className="text-bold text-2xl">Редактор категории</Text>
					{!id ? (
						<Text variant="primary" className="mt-1.5">
							(new)
						</Text>
					) : null}
				</HStack>
				<Button
					variant="ghost"
					onClick={() => navigate('/', { replace: true })}
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
