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
		if (!priceStore.isPriceExist() && !isShowSplash) navigate('/home');
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [priceStore.isPriceExist(), isShowSplash]);

	const handleHideSplash = () => setIsShowSplash(false);

	return (
		<HStack>
			<ErrorSplashScreen />
			{isShowSplash ? <Splash onHide={handleHideSplash} /> : null}
			{layoutStore.loading ? <Loader /> : null}

			<LayoutSidebarContainer />

			<Stack className="h-screen w-full">
				<LayoutHeaderContainer />

				<Div className="flex h-full overflow-x-hidden overflow-y-auto !p-6">
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
