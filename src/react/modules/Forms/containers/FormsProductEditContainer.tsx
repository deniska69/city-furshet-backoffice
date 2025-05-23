import { useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, TrashIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import ShortUniqueId from 'short-unique-id';

import { PRICE_FIELDS } from '@constants';
import { isHide } from '@helpers';
import { ErrorScreen } from '@modules/Error';
import { layoutStore, priceStore } from '@stores';
import { Button, Card, Div, Form, HStack, Input, Span, Switch, Textarea } from '@ui';

import FormsHeader from '../components/FormsHeader';
import FormsProductCoverEditorContainer from './FormsProductCoverEditorContainer';
import FormsProductGalleryEditorContainer from './FormsProductGalleryEditorContainer';

const classNameTitleCol = 'min-w-38 mt-1';

const Component = ({ categoryId, productId, onClose }: IFormsProductEditContainer) => {
	const uid = new ShortUniqueId();

	const isNew = !productId || productId === 'new';
	const backTo = `/category/${categoryId}/products`;

	const product = !isNew && categoryId ? priceStore.getProduct(categoryId, productId) : undefined;

	const {
		watch,
		register,
		setValue,
		setError,
		handleSubmit,
		getValues,
		formState: { errors },
	} = useForm<TypePriceProduct>();

	useEffect(() => {
		setValue('product_id', product?.product_id || uid.rnd());
		setValue('product_hide', product?.product_hide ? isHide(product?.product_hide) : false);
		setValue('product_title', product?.product_title || '');
		setValue('product_description', product?.product_description || '');
		setValue('product_note', product?.product_note || '');
		setValue('product_note_additional', product?.product_note_additional || '');
		setValue('product_price', product?.product_price || '');
		setValue('product_cover', product?.product_cover || '');
		setValue('product_gallery', product?.product_gallery || '');

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product?.product_id]);

	if (!categoryId) return <ErrorScreen text='Отсутствует "categoryId"' />;

	const handleChangeHide = (value: boolean) => setValue('product_hide', value);

	const handleValidate = (name: TypeHandleValidateProduct) => {
		if (!watch(name).length) return Promise.resolve();

		if (watch(name).includes('\\') || watch(name).includes(';')) {
			const message = `Поле "${PRICE_FIELDS[name]}" содержит запрещённый символ "\\" или ";"`;
			setError(name, { type: 'manual', message });
			layoutStore.setError(message);
			throw new Error(message);
		}
	};

	const handleSaveValues = async (values: TypePriceProduct) => {
		handleValidate('product_title');
		handleValidate('product_description');
		handleValidate('product_note');
		handleValidate('product_note_additional');
		handleValidate('product_price');

		if (product?.product_id) {
			priceStore.saveProduct(categoryId, values);
		} else {
			priceStore.addProduct(categoryId, values);
		}

		priceStore.setNeedSave();

		return Promise.resolve();
	};

	const handleSave = async (values: TypePriceProduct) => {
		await handleSaveValues(values);
		onClose();
	};

	const handleDelete = () => {
		if (typeof product?.index !== 'number') {
			return layoutStore.setError('typeof product?.index !== "number"');
		}

		layoutStore.alert(
			`Вы действительно хотите удалить товар "${product.product_title}" ?`,
			[
				{ title: 'Отмена' },
				{
					title: 'Удалить',
					onClick: () => {
						onClose();
						priceStore.deleteProduct(categoryId, product.product_id);
					},
				},
			],
			'warning',
		);
	};

	const handleUp = () => {
		if (product?.index === undefined) {
			return layoutStore.setError('product?.index === undefined');
		}

		priceStore.changeProductPosition(categoryId, product?.index, 'up');
	};

	const handleDown = () => {
		if (product?.index === undefined) {
			return layoutStore.setError('product?.index === undefined');
		}

		priceStore.changeProductPosition(categoryId, product?.index, 'down');
	};

	const handleChangeCover = async (coverId: string) => {
		setValue('product_cover', coverId);
		handleSaveValues(getValues());
	};

	const handleChangeGallery = async (ids: string) => {
		setValue('product_gallery', ids);
		handleSaveValues(getValues());
	};

	return (
		<Div className="border-border-light dark:border-border-dark border-l pl-6">
			<Card className="!min-w-xl max-w-xl">
				<FormsHeader
					isNew={isNew}
					backTo={backTo}
					onClose={onClose}
					titleNew="Новый товар"
					title="Редактор товара"
				/>

				<Form className="gap-y-3 !mt-6" onSubmit={handleSubmit(handleSave)}>
					{/* product_id */}
					<HStack className="max-w-[1100px] gap-x-3 items-center">
						<Span className={classNameTitleCol} variant="muted" text="ID" />
						<Input disabled {...register('product_id')} />
					</HStack>

					{/* product_hide */}
					<HStack className="max-w-[1100px] gap-x-3 items-center">
						<Span className={classNameTitleCol}>Скрыто</Span>
						<Switch onChange={handleChangeHide} value={watch('product_hide')} />
					</HStack>

					{/* product_title */}
					<HStack className="max-w-[1100px] gap-x-3 items-center">
						<Span className={classNameTitleCol}>
							Название<Span className="!text-red-500">*</Span>
						</Span>
						<Input
							autoFocus
							isInvalid={!!errors.product_title}
							{...register('product_title', { required: true })}
						/>
					</HStack>

					{/* product_description */}
					<HStack className="max-w-[1100px] gap-x-3 items-start">
						<Span className={classNameTitleCol}>Описание</Span>
						<Textarea
							{...register('product_description')}
							isInvalid={!!errors.product_description}
						/>
					</HStack>

					{/* product_note */}
					<HStack className="max-w-[1100px] gap-x-3 items-center">
						<Span className={classNameTitleCol} text="Примечание" />
						<Input {...register('product_note')} isInvalid={!!errors.product_note} />
					</HStack>

					{/* product_note_additional */}
					<HStack className="max-w-[1100px] gap-x-3 items-center">
						<Span className={classNameTitleCol} text="Доп. примечание" />
						<Input
							{...register('product_note_additional')}
							isInvalid={!!errors.product_note_additional}
						/>
					</HStack>

					{/* product_price */}
					<HStack className="max-w-[1100px] gap-x-3 items-center">
						<Span className={classNameTitleCol} text="Цена" />
						<Input {...register('product_price')} isInvalid={!!errors.product_price} />
					</HStack>

					{/* ordinal number */}
					{!isNew ? (
						<HStack className="max-w-[1100px] gap-x-3 items-center">
							<Span className={classNameTitleCol}>Порядковый номер</Span>
							<HStack className="gap-x-3">
								<Input disabled className="max-w-18" value={(product?.index || 0) + 1} />
								<Button
									onClick={handleUp}
									disabled={product?.first}
									className="!px-1.5 !py-4 !rounded-full"
									variant={product?.first ? 'ghost' : 'ghost-primary'}
								>
									<ChevronUpIcon className="w-5" />
								</Button>

								<Button
									onClick={handleDown}
									disabled={product?.last}
									className="!px-1.5 !py-4 !rounded-full"
									variant={product?.last ? 'ghost' : 'ghost-primary'}
								>
									<ChevronDownIcon className="w-5" />
								</Button>
							</HStack>
						</HStack>
					) : null}

					{/* product_cover */}
					<FormsProductCoverEditorContainer
						categoryId={categoryId}
						onChange={handleChangeCover}
						productId={watch('product_id')}
						imageId={watch('product_cover')}
					/>

					{/* product_gallery */}
					<FormsProductGalleryEditorContainer
						categoryId={categoryId}
						onChange={handleChangeGallery}
						productId={watch('product_id')}
						ids={watch('product_gallery')}
					/>

					{/* butons */}
					<HStack className="items-center mt-2 justify-end gap-x-3">
						{!isNew ? (
							<Button className="!px-2" variant="error" onClick={handleDelete}>
								<TrashIcon className="w-5" />
							</Button>
						) : null}

						<Button type="submit" text="Сохранить" />
					</HStack>
				</Form>
			</Card>
		</Div>
	);
};

export const FormsProductEditContainer = observer(Component);
