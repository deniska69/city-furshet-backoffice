import { XMarkIcon } from '@heroicons/react/24/outline';
import { To, useNavigate } from 'react-router';

import { Button, Divider, HStack, Span, Stack } from '@ui';

interface IFormsHeader {
	isNew?: boolean;
	title: string;
	backTo?: To;
	onClose?: () => void;
}

const FormsHeader = ({ isNew, title, backTo, onClose }: IFormsHeader) => {
	const navigate = useNavigate();

	const handleClose = () => {
		if (onClose) return onClose();
		if (backTo) navigate(backTo, { replace: true });
	};

	return (
		<Stack className="gap-y-3">
			<HStack className="items-center justify-between">
				<HStack className="gap-x-1">
					<Span className="text-bold text-2xl">{title}</Span>
					{isNew ? (
						<Span variant="primary" className="mt-1.5">
							(new)
						</Span>
					) : null}
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
