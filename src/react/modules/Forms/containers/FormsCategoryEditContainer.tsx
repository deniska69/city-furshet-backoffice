import { useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon, TrashIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import ShortUniqueId from 'short-unique-id';

import { CATEGORY_FIELDS } from '@constants';
import { isHide } from '@helpers';
import { layoutStore, priceStore } from '@stores';
import { Button, Form, HStack, Input, Span, Switch } from '@ui';

const Component = ({ id }: { id?: string }) => {
	const navigate = useNavigate();
	const uid = new ShortUniqueId();

	const isNew = !id;
	const category = priceStore.getCategory(id);
	const products = priceStore.getProducts(id);

	const {
		watch,
		register,
		setValue,
		setError,
		handleSubmit,
		formState: { errors },
	} = useForm<TypePriceCategory>();

	useEffect(() => {
		setValue('category_id', category?.category_id || uid.rnd());
		setValue('category_hide', category?.category_hide ? isHide(category?.category_hide) : false);
		setValue('category_title', category?.category_title || '');
		setValue('category_description', category?.category_description || '');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [category?.category_id]);

	const handleValidate = (name: TypeHandleValidateCategory) => {
		if (!watch(name).length) return;

		if (watch(name).includes('\\') || watch(name).includes(';')) {
			const message = `Поле "${CATEGORY_FIELDS[name]}" содержит запрещённый символ "\\" или ";"`;
			setError(name, { type: 'manual', message });
			layoutStore.setError(message);
			throw new Error(message);
		}
	};

	const handleChangeHide = (value: boolean) => setValue('category_hide', value);

	const handleSave = (values: TypePriceCategory) => {
		handleValidate('category_title');
		handleValidate('category_description');

		if (category?.category_id) {
			priceStore.saveCategory(category.index, values);
		} else {
			priceStore.addCategory(values);
		}

		navigate('/', { replace: true });
	};

	const handleUp = () => {
		if (category?.index === undefined) {
			return layoutStore.setError('category?.index === undefined');
		}

		priceStore.changeCategoriesPosition(category?.index, 'up');
	};

	const handleDown = () => {
		if (category?.index === undefined) {
			return layoutStore.setError('category?.index === undefined');
		}

		priceStore.changeCategoriesPosition(category?.index, 'down');
	};

	const handleDelete = () => {
		if (typeof category?.index !== 'number') {
			return layoutStore.setError('typeof category?.index !== "number"');
		}

		layoutStore.alert(
			`Вы действительно хотите удалить категорию "${category.category_title}" ?`,
			[
				{ title: 'Отмена' },
				{
					title: 'Удалить',
					onClick: () => {
						priceStore.deleteCategory(category?.index);
						navigate('/', { replace: true });
					},
				},
			],
			'warning',
		);
	};

	const handleEditProducts = () => {
		navigate(`/category/${category?.category_id}/products`, {
			replace: true,
		});
	};

	const classNameTitleCol = 'min-w-38 mt-1';

	return (
		<Form className="gap-y-3 !mt-6" onSubmit={handleSubmit(handleSave)}>
			{/* category_id */}
			<HStack className="max-w-[1100px] gap-x-3 items-center">
				<Span className={classNameTitleCol} variant="muted" text="ID" />
				<Input disabled {...register('category_id')} />
			</HStack>

			{/* category_hide */}
			<HStack className="max-w-[1100px] gap-x-3 items-center">
				<Span className={classNameTitleCol}>Скрыто</Span>
				<Switch value={watch('category_hide')} onChange={handleChangeHide} />
			</HStack>

			{/* category_title */}
			<HStack className="max-w-[1100px] gap-x-3 items-center">
				<Span className={classNameTitleCol}>
					Название<Span className="!text-red-500">*</Span>
				</Span>
				<Input
					autoFocus
					isInvalid={!!errors.category_title}
					{...register('category_title', { required: true })}
				/>
			</HStack>

			{/* category_description */}
			<HStack className="max-w-[1100px] gap-x-3 items-start">
				<Span className={classNameTitleCol}>Краткое описание</Span>
				<Input
					{...register('category_description')}
					isInvalid={!!errors.category_description}
				/>
			</HStack>

			{/* products */}
			<HStack className="max-w-[1100px] gap-x-3 items-center">
				<Span className={classNameTitleCol}>Товары</Span>
				<HStack className="gap-x-3">
					<Input disabled className="max-w-18" value={`${products?.length || 0} шт.`} />
					<Button
						variant="muted"
						disabled={isNew}
						text="Редактировать"
						onClick={handleEditProducts}
					/>
				</HStack>
			</HStack>

			{/* ordinal number */}
			{!isNew ? (
				<HStack className="max-w-[1100px] gap-x-3 items-center">
					<Span className={classNameTitleCol}>Порядковый номер</Span>
					<HStack className="gap-x-3">
						<Input disabled className="max-w-18" value={(category?.index || 0) + 1} />
						<Button
							onClick={handleUp}
							disabled={category?.first}
							className="!px-1.5 !py-4 !rounded-full"
							variant={category?.first ? 'ghost' : 'ghost-primary'}
						>
							<ChevronUpIcon className="w-5" />
						</Button>

						<Button
							onClick={handleDown}
							disabled={category?.last}
							className="!px-1.5 !py-4 !rounded-full"
							variant={category?.last ? 'ghost' : 'ghost-primary'}
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
	);
};

export const FormsCategoryEditContainer = observer(Component);
