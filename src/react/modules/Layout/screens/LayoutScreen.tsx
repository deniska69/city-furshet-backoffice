import { Suspense, useLayoutEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Outlet, useNavigate } from 'react-router';

import { useTheme } from '@hooks';
import { Loader, Splash } from '@modules/Elements';
import { ErrorSplashScreen } from '@modules/Error';
import { layoutStore, priceStore } from '@stores';
import { Div, HStack, Stack } from '@ui';

import LayoutHeaderContainer from '../containers/LayoutHeaderContainer';
import LayoutSidebarContainer from '../containers/LayoutSidebarContainer';

const Component = () => {
	useTheme();
	const navigate = useNavigate();

	const [isShowSplash, setIsShowSplash] = useState(true);

	useLayoutEffect(() => {
		if (!priceStore.price && !isShowSplash) navigate('/home');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [priceStore.price, isShowSplash]);

	const handleHideSplash = () => setIsShowSplash(false);

	return (
		<HStack>
			<ErrorSplashScreen />
			{layoutStore.loading ? <Loader /> : null}
			{isShowSplash ? <Splash onHide={handleHideSplash} /> : null}

			<LayoutSidebarContainer />

			<Stack className="h-screen w-full">
				<LayoutHeaderContainer />

				<Div className="h-full overflow-x-hidden overflow-y-auto !p-6">
					<Suspense>
						<Outlet />
					</Suspense>
				</Div>
			</Stack>
		</HStack>
	);
};

const LayoutScreen = observer(Component);

export default LayoutScreen;
