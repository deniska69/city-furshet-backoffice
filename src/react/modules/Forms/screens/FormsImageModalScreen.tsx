import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react';

import { getImageUrl } from '@helpers';
import FormsHeader from '@modules/Forms/components/FormsHeader';
import { layoutStore } from '@stores';
import { Button, Card, HStack, Image, Stack } from '@ui';

const isDivisible = (x: number, y: number) => !(x % y);

const Component = () => {
	const [deg, setDeg] = useState(0);

	if (!layoutStore.coverView) return null;

	const { categoryId, productId, coverId } = layoutStore.coverView;

	const src = getImageUrl(categoryId, productId, coverId);

	const handleClose = () => {
		setDeg(0);
		layoutStore.hideCover();
	};

	const handleRotateRight = () => {
		const newDeg = isDivisible(deg + 90, 360) ? 0 : deg + 90;
		const element = document.getElementById(coverId);

		if (element) {
			element.style.transform = `rotate(${newDeg}deg)`;
			setDeg(newDeg);
		}
	};

	const handleRotateLeft = () => {
		const newDeg = isDivisible(deg - 90, 360) ? 0 : deg - 90;
		const element = document.getElementById(coverId);

		if (element) {
			element.style.transform = `rotate(${newDeg}deg)`;
			setDeg(newDeg);
		}
	};

	const handleSave = () => console.log({ deg });

	return (
		<Stack className="bg-bg-dark/50 backdrop-blur-xs absolute z-49 flex h-screen w-full items-center justify-center">
			<Card className="!min-w-lg max-w-lg">
				<FormsHeader title="Просмотр обложки товара" onClose={handleClose} />

				<Stack className="mt-4 items-center relative">
					<Image
						id={coverId}
						src={src}
						className="w-full aspect-square rounded-lg object-cover"
					/>

					<HStack className="absolute gap-x-1 bottom-4">
						<Button onClick={handleRotateRight}>
							<ArrowRotateRight />
						</Button>
						<Button onClick={handleSave}>
							<CheckIcon className="w-5" />
						</Button>
						<Button onClick={handleRotateLeft}>
							<ArrowRotateLeft />
						</Button>
					</HStack>
				</Stack>
			</Card>
		</Stack>
	);
};

export const FormsImageModalScreen = observer(Component);

const ArrowRotateLeft = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16">
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M8 1.5a6.5 6.5 0 1 1-6.445 7.348a.75.75 0 1 1 1.487-.194A5.001 5.001 0 1 0 4.43 4.5h1.32a.75.75 0 0 1 0 1.5h-3A.75.75 0 0 1 2 5.25v-3a.75.75 0 0 1 1.5 0v1.06A6.48 6.48 0 0 1 8 1.5"
			clip-rule="evenodd"
		/>
	</svg>
);

const ArrowRotateRight = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16">
		<path
			fill="currentColor"
			fill-rule="evenodd"
			d="M8 1.5a6.5 6.5 0 1 0 6.445 7.348a.75.75 0 1 0-1.487-.194A5.001 5.001 0 1 1 11.57 4.5h-1.32a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-1.5 0v1.06A6.48 6.48 0 0 0 8 1.5"
			clip-rule="evenodd"
		/>
	</svg>
);
