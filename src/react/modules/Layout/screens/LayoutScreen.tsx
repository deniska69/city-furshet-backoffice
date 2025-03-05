import { Suspense, useLayoutEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { Loader, Splash } from '@modules/Elements';
import { useTheme } from '@hooks';
import { layoutStore, priceStore } from '@stores';
import { observer } from 'mobx-react';
import { Div, HStack, Stack } from '@ui';

import Sidebar from '../containers/Sidebar';
import Header from '../containers/Header';

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
		<HStack>
			{isShowSplash ? <Splash onHide={handleHideSplash} /> : null}
			{layoutStore.loading ? <Loader /> : null}

			<Sidebar />

			<Stack className="h-screen w-full">
				<Header />

				<Div className="flex h-full overflow-x-hidden overflow-y-auto">
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
