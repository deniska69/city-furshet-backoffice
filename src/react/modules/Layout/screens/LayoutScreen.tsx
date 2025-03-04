import { Suspense, useLayoutEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { Splash } from '@modules/Elements';
import { useTheme } from '@hooks';
import { priceStore } from '@stores';
import { observer } from 'mobx-react';

const Component = () => {
	useTheme();
	const navigate = useNavigate();

	const [isShowSplash, setIsShowSplash] = useState(true);

	useLayoutEffect(() => {
		if (!priceStore.exPrice() && !isShowSplash) {
			navigate('/start');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [priceStore.exPrice(), isShowSplash]);

	const handleHideSplash = () => setIsShowSplash(false);

	return (
		<Suspense>
			{isShowSplash ? <Splash onHide={handleHideSplash} /> : null}
			<Outlet />
		</Suspense>
	);
};

const LayoutScreen = observer(Component);

export default LayoutScreen;
