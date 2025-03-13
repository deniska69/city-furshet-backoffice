import { PlusIcon } from '@heroicons/react/24/outline';

import { Card } from '@ui';

interface IFormsProductNewCard {
	onClick: () => void;
}

const FormsProductNewCard = ({ onClick }: IFormsProductNewCard) => (
	<Card
		onClick={onClick}
		className="relative group flex flex-col items-center justify-center h-auto w-[234px] min-h-[326px] cursor-pointer group"
	>
		<PlusIcon className="w-24 text-muted-light dark:text-muted-dark group-hover:text-primary" />
	</Card>
);

export default FormsProductNewCard;
