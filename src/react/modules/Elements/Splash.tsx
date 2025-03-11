import { useEffect } from 'react';

import logoLime from '@assets/icon.png';
import { SPLASH_SCREEN_DURATION } from '@constants';
import { Div, Image } from '@ui';

import './Splash.css';

interface ISplashScreen {
	onHide: () => void;
}

export const Splash = ({ onHide }: ISplashScreen) => {
	useEffect(() => {
		setTimeout(() => onHide(), SPLASH_SCREEN_DURATION);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Div className="bg-bg-dark absolute z-50 flex h-screen w-full items-center justify-center">
			<Image src={logoLime} className="splash-logo h-24 w-24" />
		</Div>
	);
};
