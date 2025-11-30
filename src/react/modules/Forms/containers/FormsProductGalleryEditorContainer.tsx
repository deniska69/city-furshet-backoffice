import { observer } from 'mobx-react';
import ShortUniqueId from 'short-unique-id';

import { layoutStore } from '@stores';
import { HStack, Span } from '@ui';

import FormsAddImage from '../components/FormsAddImage';
import FormsEditImage from '../components/FormsEditImage';

interface IComponent {
	categoryId: string;
	productId: string;
	ids?: string;
	isNew: boolean;
	onChange: (ids: string) => void;
}

const FormsProductGalleryEditorContainer = observer((props: IComponent) => {
	const { categoryId, productId, ids, isNew, onChange } = props;

	const images = ids ? ids.split(',') : [];

	const uid = new ShortUniqueId();

	const handleSaveReturned = (index: number, id: string) => {
		const newImages = images.map((el, i) => (index === i ? id : el));

		onChange(newImages.join(','));
	};

	const handleShow = (index: number, id: string) => {
		layoutStore.showImageModal({
			categoryId,
			productId,
			imageId: id,
			onChange: (newId) => handleSaveReturned(index, newId),
		});
	};

	const handleChange = async (index?: number) => {
		if (isNew) {
			return layoutStore.setError('Для добавления галереи - необходимо сохранить товар.');
		}

		layoutStore.setLoading();
		const newId = uid.rnd();

		await window.electron
			.addImage(categoryId, productId, newId)
			.then(() => {
				if (index === undefined) {
					onChange([...images, newId].join(','));
				} else {
					const newImages = images.filter((el, i) => (index === i ? newId : el));
					onChange(newImages.join(','));
				}
			})
			.catch(() => {})
			.finally(() => layoutStore.setLoading(false));
	};

	const handleDeleteConfirm = (index: number) => {
		layoutStore.alert(
			`Вы действительно хотите удалить изображение ?`,
			[
				{ title: 'Отмена' },
				{
					title: 'Удалить',
					onClick: () => handleDelete(index),
				},
			],
			'warning',
		);
	};

	const handleDelete = async (index: number) => {
		const newImages = images.filter((el, i) => index !== i && el);
		onChange(newImages.join(','));
	};

	return (
		<HStack className="max-w-[1100px] gap-x-3 items-start">
			<Span className="min-w-38 mt-1" text="Галерея" />

			<HStack className="gap-x-3 overflow-x-auto pb-2">
				{images.map((el, index) => (
					<FormsEditImage
						key={index}
						imageId={el}
						{...{ categoryId, productId }}
						onShow={() => handleShow(index, el)}
						onChange={() => handleChange(index)}
						onDelete={() => handleDeleteConfirm(index)}
					/>
				))}
				<FormsAddImage onChange={handleChange} />
			</HStack>
		</HStack>
	);
});

export default FormsProductGalleryEditorContainer;
