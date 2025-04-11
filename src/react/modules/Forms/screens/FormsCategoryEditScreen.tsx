import { useParams } from 'react-router';

import { Card } from '@ui';

import FormsHeader from '../components/FormsHeader';
import { FormsCategoryEditContainer } from '../containers/FormsCategoryEditContainer';

export const FormsCategoryEditScreen = () => {
	const { categoryId } = useParams();

	return (
		<Card className="max-w-xl">
			<FormsHeader
				backTo="/"
				isNew={!categoryId}
				title="Редактор категории"
				titleNew="Новая категория"
			/>
			<FormsCategoryEditContainer id={categoryId} />
		</Card>
	);
};
