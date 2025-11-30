import { useParams } from 'react-router';

import { Card } from '@ui';

import FormsHeader from '../components/FormsHeader';
import FormsCategoryEditContainer from '../containers/FormsCategoryEditContainer';

const FormsCategoryEditScreen = () => {
	const { categoryId } = useParams();

	return (
		<Card className="max-w-xl">
			<FormsHeader
				backTo="/"
				title="Редактор категории"
				titleNew={!categoryId ? 'Новая категория' : undefined}
			/>
			<FormsCategoryEditContainer id={categoryId} />
		</Card>
	);
};

export default FormsCategoryEditScreen;
