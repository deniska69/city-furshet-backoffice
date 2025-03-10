import { useEffect } from 'react';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router';
import ShortUniqueId from 'short-unique-id';

import { priceStore } from '@stores';
import { TypePriceCategory } from '@types';
import { Button, Card, cn, Form, HStack, Input, Switch, Text, Textarea } from '@ui';

import FormsHeader from '../components/FormsHeader';

const Component = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const uid = new ShortUniqueId();

	const category = id ? priceStore.getCategory(id) : null;
	const isNew = !id;

	const {
		watch,
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<TypePriceCategory>();

	useEffect(() => {
		setValue('category_id', category?.category_id || uid.rnd());
		setValue('category_title', category?.category_title || '');
		setValue('category_description', category?.category_description || '');
		setValue('category_hide', !!category?.category_hide);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [category?.category_id]);

	const handleChangeHide = (value: boolean) => setValue('category_hide', value);

	const handleSave = (values: TypePriceCategory) => {
		priceStore.addCategory(values);
		navigate('/', { replace: true });
	};

	const handleUp = () => {
		if (category?.index) {
			priceStore.changeCategoriesPosition(category?.index, 'up');
		}
	};

	const handleDown = () => {
		if (category?.index) {
			priceStore.changeCategoriesPosition(category?.index, 'down');
		}
	};

	return (
		<Card className="max-w-xl">
			<FormsHeader isNew={isNew} />

			<Form className="gap-y-3 !mt-6" onSubmit={handleSubmit(handleSave)}>
				<HStack className="max-w-[600px] gap-x-3 items-center">
					<Text className="min-w-24" variant="muted">
						ID
					</Text>
					<Input
						disabled
						isInvalid={!!errors.category_id}
						{...register('category_id', { required: true })}
					/>
				</HStack>

				<HStack className="max-w-[600px] gap-x-3 items-center">
					<Text className="min-w-24">Скрыто</Text>
					<Switch value={watch('category_hide')} onChange={handleChangeHide} />
				</HStack>

				<HStack className="max-w-[600px] gap-x-3 items-center">
					<Text className="min-w-24">
						Название<Text className="!text-red-500">*</Text>
					</Text>
					<Input
						autoFocus
						isInvalid={!!errors.category_title}
						{...register('category_title', { required: true })}
					/>
				</HStack>

				<HStack className="max-w-[600px] gap-x-3 items-start">
					<Text className="min-w-24 mt-1" {...register('category_description')}>
						Описание
					</Text>
					<Textarea />
				</HStack>

				<HStack className={cn('items-center', isNew ? 'justify-end' : 'justify-between')}>
					{!isNew ? (
						<HStack className="items-center gap-x-1">
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
					) : null}

					<Button className="self-end mt-4" type="submit" text="Сохранить" />
				</HStack>
			</Form>
		</Card>
	);
};

export const FormsCategoryScreen = observer(Component);
