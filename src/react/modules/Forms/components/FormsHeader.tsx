import { XMarkIcon } from '@heroicons/react/24/outline';
import { To, useNavigate } from 'react-router';

import { Button, Divider, HStack, Span, Stack } from '@ui';

interface IFormsHeader {
	isNew?: boolean;
	title: string;
	titleNew?: string;
	backTo?: To;
	onClose?: () => void;
}

const FormsHeader = ({ isNew, title, titleNew, backTo, onClose }: IFormsHeader) => {
	const navigate = useNavigate();

	const handleClose = () => {
		if (onClose) return onClose();
		if (backTo) navigate(backTo, { replace: true });
	};

	return (
		<Stack className="gap-y-3">
			<HStack className="items-center justify-between">
				<HStack className="gap-x-1">
					{isNew ? (
						<Span variant="primary" className="text-bold text-2xl">
							{titleNew}
						</Span>
					) : (
						<Span className="text-bold text-2xl">{title}</Span>
					)}
				</HStack>
				<Button variant="ghost" onClick={handleClose} className="!px-1.5 !py-4 !rounded-full">
					<XMarkIcon className="w-5" />
				</Button>
			</HStack>
			<Divider />
		</Stack>
	);
};

export default FormsHeader;
