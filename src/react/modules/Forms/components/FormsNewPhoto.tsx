import { PlusIcon } from '@heroicons/react/24/outline';

import { Card, Pressable } from '@ui';

const FormsNewPhoto = ({ onClick }: { onClick: () => void }) => (
	<Pressable onClick={onClick}>
		<Card className="items-center justify-center w-24 h-24 bg-neutral-100 dark:bg-neutral-900/50 hover:cursor-pointer hover:bg-neutral-200 dark:hover:bg-neutral-900">
			<PlusIcon className="w-12 text-muted-light dark:text-muted-dark" />
		</Card>
	</Pressable>
);

export default FormsNewPhoto;
