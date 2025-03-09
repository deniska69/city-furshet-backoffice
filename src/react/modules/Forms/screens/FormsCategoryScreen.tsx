import { observer } from 'mobx-react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import ShortUniqueId from 'short-unique-id';

import { TypePriceCategory } from '@types';
import { Button, Card, Form, HStack, Input, Switch, Text, Textarea } from '@ui';

import FormsHeader from '../components/FormsHeader';

const Component = () => {
	const { id } = useParams();
	const uid = new ShortUniqueId();

	const {
		watch,
		register,
		setValue,
		handleSubmit,
		formState: { errors },
	} = useForm<TypePriceCategory>({
		defaultValues: {
			category_id: id || uid.rnd(),
			category_title: '',
			category_description: '',
			category_hide: false,
		},
	});

	const handleChangeHide = (value: boolean) => setValue('category_hide', value);

	const handleSave = (values: TypePriceCategory) => {
		console.log(values);
	};

	return (
		<Card className="max-w-xl">
			<FormsHeader />

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

				<Button className="self-end mt-4" type="submit" text="Сохранить" />
			</Form>
		</Card>
	);
};

export const FormsCategoryScreen = observer(Component);
