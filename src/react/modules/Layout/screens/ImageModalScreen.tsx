import { observer } from 'mobx-react';

import FormsHeader from '@modules/Forms/components/FormsHeader';
import { layoutStore } from '@stores';
import { Card, Stack } from '@ui';

const Component = () => {
	if (!layoutStore.coverView) return null;

	const { categoryId, productId, coverId } = layoutStore.coverView;

	const handleClose = () => layoutStore.hideCover();

	return (
		<Stack className="bg-bg-dark/50 backdrop-blur-xs absolute z-49 flex h-screen w-full items-center justify-center">
			<Card className="!min-w-xl max-w-xl">
				<FormsHeader title="Просмотр обложки товара" onClose={handleClose} />
				ImageModalScreen
			</Card>
		</Stack>
	);
};

const ImageModalScreen = observer(Component);
export default ImageModalScreen;
