import { observer } from 'mobx-react';
import ShortUniqueId from 'short-unique-id';

import { layoutStore } from '@stores';
import { HStack, Span } from '@ui';

import FormsAddImage from '../components/FormsAddImage';
import FormsEditImage from '../components/FormsEditImage';

interface IComponent {
	categoryId: string;
	productId: string;
	imageId?: string;
	onChange: (imageId: string) => void;
}

const Component = (props: IComponent) => {
	const { categoryId, productId, imageId, onChange } = props;

	const uid = new ShortUniqueId();

	const handleShow = (id: string) => {
		layoutStore.showImageModal({ categoryId, productId, imageId: id, onChange });
	};

	const handleChange = async () => {
		layoutStore.setLoading();
		const newCoverId = uid.rnd();

		await window.electron
			.addImage(categoryId, productId, newCoverId)
			.then(() => onChange(newCoverId))
			.catch(() => {})
			.finally(() => layoutStore.setLoading(false));
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

	const handleDelete = async () => onChange('');

	return (
		<HStack className="max-w-[1100px] gap-x-3 items-start">
			<Span className="min-w-38 mt-1" text="Обложка" />

			{imageId ? (
				<FormsEditImage
					onShow={handleShow}
					onChange={handleChange}
					onDelete={handleDeleteConfirm}
					{...{ categoryId, productId, imageId }}
				/>
			) : (
				<FormsAddImage onChange={handleChange} />
			)}
		</HStack>
	);
};

const FormsProductCoverEditorContainer = observer(Component);

export default FormsProductCoverEditorContainer;
