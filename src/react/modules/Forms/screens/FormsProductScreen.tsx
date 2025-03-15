import { useEffect } from 'react';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import ShortUniqueId from 'short-unique-id';

import { priceStore } from '@stores';
import { TypePriceProduct } from '@types';
import {
	Button,
	Card,
	Form,
	HStack,
	Input,
	Span,
	Stack,
	Switch,
	Textarea,
} from '@ui';

import FormsHeader from '../components/FormsHeader';

const Component = () => {
	const navigate = useNavigate();
	const uid = new ShortUniqueId();
	const { categoryId, productId } = useParams();

	const isNew = !productId;
	const backTo = `/category/${categoryId}/products`;

	const product =
		!isNew && categoryId
			? priceStore.getProduct(categoryId, productId)
			: undefined;

	const handleBack = () => navigate(backTo, { replace: true });

	const {
		watch,
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<TypePriceProduct>();

	useEffect(() => {
		setValue('product_id', product?.product_id || uid.rnd());
		setValue('product_hide', !!product?.product_hide);
		setValue('product_title', product?.product_title || '');
		setValue(
			'product_title_description',
			product?.product_title_description || '',
		);
		setValue('product_description', product?.product_description || '');
		setValue('product_note', product?.product_note || '');
		setValue('product_price', product?.product_price || '');
		setValue('product_cover', product?.product_cover || '');
		setValue('product_cover', product?.product_cover || '');

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [product?.product_id]);

	const handleChangeHide = (value: boolean) => setValue('product_hide', value);

	const handleSave = (values: TypePriceProduct) => {
		console.log(values);
	};

	return (
		<Stack className="items-start gap-y-3">
			<Button
				variant="link"
				onClick={handleBack}
				text="<< Вернуться к списку товаров"
			/>

			<Card className="!min-w-xl max-w-xl">
				<FormsHeader
					isNew={isNew}
					backTo={backTo}
					title="Редактор товара"
				/>

				<Form className="gap-y-3 !mt-6" onSubmit={handleSubmit(handleSave)}>
					{/* product_id */}
					<HStack className="max-w-[1100px] gap-x-3 items-center">
						<Span
							className="min-w-24 max-w-24"
							variant="muted"
							text="ID"
						/>
						<Input disabled {...register('product_id')} />
					</HStack>

					{/* product_hide */}
					<HStack className="max-w-[1100px] gap-x-3 items-center">
						<Span className="min-w-24 max-w-24">Скрыто</Span>
						<Switch
							onChange={handleChangeHide}
							value={watch('product_hide')}
						/>
					</HStack>

					{/* product_title */}
					<HStack className="max-w-[1100px] gap-x-3 items-center">
						<Span className="min-w-24 max-w-24">
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
						<Span className="min-w-24 max-w-24">Описание названия</Span>
						<Input {...register('product_title_description')} />
					</HStack>

					{/* product_description */}
					<HStack className="max-w-[1100px] gap-x-3 items-start">
						<Span className="min-w-24 max-w-24 mt-1">Описание</Span>
						<Textarea {...register('product_description')} />
					</HStack>

					{/* product_note */}
					<HStack className="max-w-[1100px] gap-x-3 items-center">
						<Span className="min-w-24 max-w-24">Примечание</Span>
						<Input {...register('product_note')} />
					</HStack>

					{/* product_price */}
					<HStack className="max-w-[1100px] gap-x-3 items-center">
						<Span className="min-w-24 max-w-24">
							Цена<Span className="!text-red-500">*</Span>
						</Span>
						<Input
							isInvalid={!!errors.product_price}
							{...register('product_price', { required: true })}
						/>
					</HStack>

					{/* product_cover */}
					{/* product_gallery */}
				</Form>
			</Card>
		</Stack>
	);
};

export const FormsProductScreen = observer(Component);
