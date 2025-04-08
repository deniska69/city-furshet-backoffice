import { useEffect, useState } from 'react';
import {
	ExclamationTriangleIcon,
	EyeIcon,
	PencilIcon,
	TrashIcon,
} from '@heroicons/react/24/outline';

import { getImageUrl } from '@helpers';
import { Button, Div, Image, Stack } from '@ui';

interface IFormsEditImage {
	categoryId: string;
	productId: string;
	imageId: string;
	onChange: () => void;
	onShow: (imageId: string) => void;
	onDelete: (imageId: string) => void;
}

const FormsEditImage = (props: IFormsEditImage) => {
	const { categoryId, productId, imageId, onChange, onShow, onDelete } = props;

	const [image, setImage] = useState<string | undefined>(undefined);
	const [error, setError] = useState(false);

	useEffect(() => {
		const src = imageId ? getImageUrl(categoryId, productId, imageId) : undefined;
		setImage(src);
		if (src) setError(false);

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [imageId]);

	const handleShow = () => onShow(imageId);

	const handleChange = () => onChange();

	const handleDelete = () => onDelete(imageId);

	const handleError = () => setError(true);

	return (
		<Div className="relative group">
			{error ? (
				<Div className="w-24 h-24 rounded-lg flex items-center justify-center bg-red-900/80">
					<ExclamationTriangleIcon className="w-12 text-white" />
				</Div>
			) : (
				<Image
					src={image}
					onError={handleError}
					className="w-24 h-24 rounded-lg object-cover"
				/>
			)}

			<Stack className="hidden group-hover:flex backdrop-blur-[2px] absolute h-full w-full top-0 rounded-lg p-1 gap-y-1 justify-center">
				<Button disabled={error} variant="solid" className="!py-1" onClick={handleShow}>
					<EyeIcon className="w-4" />
				</Button>
				<Button variant="muted" className="!py-1" onClick={handleChange}>
					<PencilIcon className="w-4" />
				</Button>
				<Button variant="error" className="!py-1" onClick={handleDelete}>
					<TrashIcon className="w-4" />
				</Button>
			</Stack>
		</Div>
	);
};

export default FormsEditImage;
