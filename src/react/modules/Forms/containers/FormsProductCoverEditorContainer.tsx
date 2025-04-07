import { EyeIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react';
import ShortUniqueId from 'short-unique-id';

import { getImageUrl } from '@helpers';
import { layoutStore } from '@stores';
import { Button, Div, HStack, Image, Span, Stack } from '@ui';

import FormsNewPhoto from '../components/FormsNewPhoto';

interface IFormsProductCoverEditor {
	categoryId: string;
	productId: string;
	coverId?: string;
	onChange: (coverId: string) => void;
}

const Component = (props: IFormsProductCoverEditor) => {
	const { categoryId, productId, coverId, onChange } = props;

	const src = coverId ? getImageUrl(categoryId, productId, coverId) : undefined;

	const uid = new ShortUniqueId();

	const handleShow = () => {
		if (!coverId) return layoutStore.setError('Отсутствует "coverId"');
		layoutStore.showCover({ categoryId, productId, coverId, onChange });
	};

	const handleChange = async () => {
		layoutStore.setLoading();
		const newCoverId = uid.rnd();

		await window.electron
			.addImage(categoryId, productId, newCoverId)
			.then(() => onChange(newCoverId))
			.catch(() => {})
			.finally(() => layoutStore.setLoading(false));

		if (coverId) {
			await window.electron.deleteImage(categoryId, productId, coverId);
		}
	};

	const handleDeleteConfirm = () => {
		layoutStore.alert(
			`Вы действительно хотите удалить изображение ?`,
			[
				{ title: 'Отмена' },
				{
					title: 'Удалить',
					onClick: handleDelete,
				},
			],
			'warning',
		);
	};

	const handleDelete = async () => {
		if (!coverId) return layoutStore.setError('Отсутствует "coverId"');

		layoutStore.setLoading();

		await window.electron
			.deleteImage(categoryId, productId, coverId)
			.then(() => {})
			.catch(() => {})
			.finally(() => {
				onChange('');
				layoutStore.setLoading(false);
			});
	};

	return (
		<HStack className="max-w-[1100px] gap-x-3 items-start">
			<Span className="min-w-38 mt-1" text="Обложка" />

			{src ? (
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
			) : (
				<FormsNewPhoto onClick={handleChange} />
			)}
		</HStack>
	);
};

const FormsProductCoverEditorContainer = observer(Component);

export default FormsProductCoverEditorContainer;
