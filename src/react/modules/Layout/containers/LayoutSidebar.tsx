import { observer } from 'mobx-react';

import logoFull from '@assets/logo_full.png';
import { Card, cn, Div, Image } from '@ui';

const Component = () => {
	return (
		<Card
			className={cn(
				'h-screen max-w-64 min-w-64',
				'border-y-0 border-r border-l-0',
				'flex flex-col',
			)}
		>
			<Div className="flex min-h-16 items-center justify-center">
				<Image src={logoFull} className="max-h-12" />
			</Div>
		</Card>
	);
};

const LayoutSidebar = observer(Component);

export default LayoutSidebar;
