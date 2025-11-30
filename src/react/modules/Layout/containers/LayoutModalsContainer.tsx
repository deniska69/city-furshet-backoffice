import { Fragment } from 'react/jsx-runtime';

import { ImageViewModal, ProductPreviewModal } from '@modules/Modals';
import { ProductEditModal } from '@modules/Modals/ProductEditModal';

const LayoutModalsContainer = () => {
	return (
		<Fragment>
			<ProductPreviewModal />
			<ProductEditModal />
			<ImageViewModal />
		</Fragment>
	);
};

export default LayoutModalsContainer;
