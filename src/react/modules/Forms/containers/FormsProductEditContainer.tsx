import { useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, TrashIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import ShortUniqueId from 'short-unique-id';

import { layoutStore, priceStore } from '@stores';
import { Button, Card, Div, Form, HStack, Input, Span, Switch, Textarea } from '@ui';

import FormsHeader from '../components/FormsHeader';

interface IComponent {
	categoryId?: string;
	productId?: string;
	onClose: () => void;
}

const Component = ({ categoryId, productId, onClose }: IComponent) => {
	const uid = new ShortUniqueId();

	const isNew = !productId || productId === 'new';
	const backTo = `/category/${categoryId}/products`;

	const product = !isNew && categoryId ? priceStore.getProduct(categoryId, productId) : undefined;

	const {
		watch,
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<TypePriceProduct>();

	useEffect(() => {
		setValue('product_id', product?.product_id || uid.rnd());
		setValue('product_hide', product?.product_hide === 'true' ? 'true' : 'false');
		setValue('product_title', product?.product_title || '');
		setValue('product_title_description', product?.product_title_description || '');
		setValue('product_description', product?.product_description || '');
		setValue('product_note', product?.product_note || '');
		setValue('product_price', product?.product_price || '');
		setValue('product_cover', product?.product_cover || '');
		setValue('product_cover', product?.product_cover || '');

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product?.product_id]);

	const handleChangeHide = (value: boolean) => setValue('product_hide', value ? 'true' : 'false');

	const handleSave = (values: TypePriceProduct) => {
		if (!categoryId) {
			return layoutStore.setError('Отсутствует обязательный параметр "categoryId"');
		}

		if (product?.product_id) {
			priceStore.saveProduct(categoryId, values);
		} else {
			priceStore.addProduct(categoryId, values);
		}

		onClose();
	};

	const handleDelete = () => {
		if (typeof product?.index !== 'number' || !categoryId) return;

		layoutStore.alert(
			`Вы действительно хотите удалить товар "${product.product_title}" ?`,
			() => {
				priceStore.deleteProduct(categoryId, product.product_id);
			},
		);

		onClose();
	};

	const handleUp = () => {
		if (product?.index !== undefined && categoryId) {
			priceStore.changeProductPosition(categoryId, product?.index, 'up');
		}
	};

	const handleDown = () => {
		if (product?.index !== undefined && categoryId) {
			priceStore.changeProductPosition(categoryId, product?.index, 'down');
		}
	};

	const classNameTitleCol = 'min-w-38 mt-1';

	return (
		<Div className="border-border-light dark:border-border-dark border-l pl-6">
			<Card className="!min-w-xl max-w-xl">
				<FormsHeader isNew={isNew} backTo={backTo} title="Редактор товара" onClose={onClose} />

				<Form className="gap-y-3 !mt-6" onSubmit={handleSubmit(handleSave)}>
					{/* product_id */}
					<HStack className="max-w-[1100px] gap-x-3 items-center">
						<Span className={classNameTitleCol} variant="muted" text="ID" />
						<Input disabled {...register('product_id')} />
					</HStack>

					{/* product_hide */}
					<HStack className="max-w-[1100px] gap-x-3 items-center">
						<Span className={classNameTitleCol}>Скрыто</Span>
						<Switch onChange={handleChangeHide} value={watch('product_hide') === 'true'} />
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

					{/* product_title_description */}
					<HStack className="max-w-[1100px] gap-x-3 items-center">
						<Span className={classNameTitleCol}>Описание названия</Span>
						<Input {...register('product_title_description')} />
					</HStack>

					{/* product_description */}
					<HStack className="max-w-[1100px] gap-x-3 items-start">
						<Span className={classNameTitleCol}>Описание</Span>
						<Textarea {...register('product_description')} />
					</HStack>

					{/* product_note */}
					<HStack className="max-w-[1100px] gap-x-3 items-center">
						<Span className={classNameTitleCol} text="Примечание" />
						<Input {...register('product_note')} />
					</HStack>

					{/* product_price */}
					<HStack className="max-w-[1100px] gap-x-3 items-center">
						<Span className={classNameTitleCol} text="Цена" />
						<Input {...register('product_price')} />
					</HStack>

					{/* product_cover */}
					{/* product_gallery */}

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
