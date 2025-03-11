import logoFull from '@assets/logo_full.png';
import { Div, Image } from '@ui';

const LayoutLogo = () => (
	<Div className="flex min-h-16 items-center justify-center">
		<Image src={logoFull} className="max-h-12" />
	</Div>
);

export default LayoutLogo;
