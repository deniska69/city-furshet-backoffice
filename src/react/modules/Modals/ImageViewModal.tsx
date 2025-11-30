import { useState } from 'react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { observer } from 'mobx-react';
import ShortUniqueId from 'short-unique-id';

import { getImageUrl } from '@helpers';
import { useEscape } from '@hooks';
import FormsHeader from '@modules/Forms/components/FormsHeader';
import { layoutStore } from '@stores';
import { Button, Card, Div, HStack, Image, Span, Stack } from '@ui';

const isDivisible = (x: number, y: number) => !(x % y);

export const ImageViewModal = observer(() => {
	const uid = new ShortUniqueId();

	const [deg, setDeg] = useState(0);

	const handleClose = () => {
		setDeg(0);
		layoutStore.hideImageModal();
	};

	useEscape(handleClose);

	if (!layoutStore.imageModal) return null;

	const { categoryId, productId, imageId, onChange } = layoutStore.imageModal;

	const src = getImageUrl(categoryId, productId, imageId);

	const handleRotateRight = () => {
		const newDeg = isDivisible(deg + 90, 360) ? 0 : deg + 90;
		const element = document.getElementById(imageId);

		if (element) {
			element.style.transform = `rotate(${newDeg}deg)`;
			setDeg(newDeg);
		}
	};

	const handleRotateLeft = () => {
		const newDeg = isDivisible(deg - 90, 360) ? 0 : deg - 90;
		const element = document.getElementById(imageId);

		if (element) {
			element.style.transform = `rotate(${newDeg}deg)`;
			setDeg(newDeg);
		}
	};

	const handleSave = async () => {
		layoutStore.setLoading();

		const newCoverId = uid.rnd();

		await window.electron
			.rotateAndSaveImage(deg, categoryId, productId, imageId, newCoverId)
			.then(() => {
				onChange(newCoverId);
				handleClose();
			})
			.catch(() => {})
			.finally(() => layoutStore.setLoading(false));
	};

	return (
		<Stack className="bg-bg-dark/50 backdrop-blur-xs absolute z-52 flex h-screen w-full items-center justify-center">
			<Card className="!min-w-lg max-w-lg p-0!">
				<FormsHeader title="Просмотр обложки товара" onClose={handleClose} />

				<Stack className="items-center relative p-4">
					<Image
						id={imageId}
						src={src}
						className="w-full aspect-square rounded-lg object-cover"
					/>

					<Div className="absolute top-8 right-8 px-3 pt-0 pb-1 bg-neutral-800/30 rounded-lg">
						ID: <Span className="text-white text-xs">{imageId}</Span>
					</Div>

					<HStack className="absolute gap-x-1 bottom-8">
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
});

const ArrowRotateLeft = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16">
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M8 1.5a6.5 6.5 0 1 1-6.445 7.348a.75.75 0 1 1 1.487-.194A5.001 5.001 0 1 0 4.43 4.5h1.32a.75.75 0 0 1 0 1.5h-3A.75.75 0 0 1 2 5.25v-3a.75.75 0 0 1 1.5 0v1.06A6.48 6.48 0 0 1 8 1.5"
			clipRule="evenodd"
		/>
	</svg>
);

const ArrowRotateRight = () => (
	<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 16 16">
		<path
			fill="currentColor"
			fillRule="evenodd"
			d="M8 1.5a6.5 6.5 0 1 0 6.445 7.348a.75.75 0 1 0-1.487-.194A5.001 5.001 0 1 1 11.57 4.5h-1.32a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 .75-.75v-3a.75.75 0 0 0-1.5 0v1.06A6.48 6.48 0 0 0 8 1.5"
			clipRule="evenodd"
		/>
	</svg>
);
