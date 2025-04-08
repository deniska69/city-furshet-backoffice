import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react';

import { getImageUrl } from '@helpers';
import { Button, Card, Div, HStack, Image, Span, Stack } from '@ui';

import FormsNewPhoto from '../components/FormsAddImage';

interface IComponent {
	categoryId: string;
	productId: string;
	ids?: string;
	onChange: (ids: string) => void;
}

const Component = (props: IComponent) => {
	const handleAddNew = () => console.log('[handleAddNew]');

	return (
		<HStack className="max-w-[1100px] gap-x-3 items-start">
			<Span className="min-w-38 mt-1" text="Галерея" />

			<HStack>
				<Photo {...props} />
				<FormsNewPhoto onClick={handleAddNew} />
			</HStack>
		</HStack>
	);
};

const FormsProductGalleryEditorContainer = observer(Component);

export default FormsProductGalleryEditorContainer;

interface IPhoto {
	categoryId: string;
	productId: string;
	coverId?: string;
	onChange: (coverId?: string) => void;
}

const Photo = (props: IPhoto) => {
	const { categoryId, productId, coverId, onChange } = props;

	const src = coverId ? getImageUrl(categoryId, productId, coverId) : undefined;

	if (!src) return null;

	const handleChange = () => onChange(coverId);

	const handleShow = () => {};

	const handleDeleteConfirm = () => {};

	return (
		<Div className="relative group">
			<Image src={src} className="w-24 h-24 rounded-lg object-cover" />

			<Stack className="hidden group-hover:flex backdrop-blur-[2px] absolute h-full w-full top-0 rounded-lg p-1 gap-y-1 justify-center">
				<Button variant="solid" className="!py-1" onClick={handleShow}>
					<EyeIcon className="w-4" />
				</Button>

				<Button variant="muted" className="!py-1" onClick={handleChange}>
					<PencilIcon className="w-4" />
				</Button>

				<Button variant="error" className="!py-1" onClick={handleDeleteConfirm}>
					<TrashIcon className="w-4" />
				</Button>
			</Stack>
		</Div>
	);
};
