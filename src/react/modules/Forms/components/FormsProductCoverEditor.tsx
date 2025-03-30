import { Fragment } from 'react';
import { EyeIcon, PencilIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

import { Button, cn, Div, HStack, Image, Span, Stack } from '@ui';

interface IFormsProductCoverEditor {
	src?: string;
	onChange: () => void;
}

const FormsProductCoverEditor = (props: IFormsProductCoverEditor) => (
	<HStack className="max-w-[1100px] gap-x-3 items-start">
		<Span className="min-w-38 mt-1" text="Обложка" />

		<Div className="relative group">
			<Image src={props.src} className="w-24 h-24 rounded-lg object-cover" />

			<Stack
				className={cn(
					'hidden group-hover:flex backdrop-blur-[2px] absolute h-full w-full top-0 rounded-lg p-1 gap-y-1 justify-center',
					props.src ? '' : 'hover:cursor-pointer items-center',
				)}
				onClick={props.src ? undefined : props.onChange}
			>
				{props.src ? (
					<Fragment>
						<Button variant="solid" className="!py-1">
							<EyeIcon className="w-4" />
						</Button>
						<Button variant="muted" className="!py-1" onClick={props.onChange}>
							<PencilIcon className="w-4" />
						</Button>
						<Button variant="error" className="!py-1">
							<TrashIcon className="w-4" />
						</Button>
					</Fragment>
				) : (
					<PlusIcon className="w-18 text-primary stroke-2" />
				)}
			</Stack>
		</Div>
	</HStack>
);

export default FormsProductCoverEditor;
