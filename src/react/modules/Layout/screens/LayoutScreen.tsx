import { Suspense, useLayoutEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { Outlet, useNavigate } from 'react-router';

import { ERROR_CODES, getError } from '@electron/utils/bridgeEvents';
import { useTheme } from '@hooks';
import { Loader } from '@modules/Elements';
import { ErrorSplashScreen } from '@modules/Error';
import { FormsImageModalScreen } from '@modules/Forms';
import { layoutStore, priceStore } from '@stores';
import { Div, HStack, Stack } from '@ui';

import LayoutHeaderContainer from '../containers/LayoutHeaderContainer';
import LayoutSidebarContainer from '../containers/LayoutSidebarContainer';
import LayouSplashScreen from './LayouSplashScreen';
import LayoutAlertScreen from './LayoutAlertScreen';

const Component = () => {
	useTheme();
	const navigate = useNavigate();

	const [isShowSplash, setIsShowSplash] = useState(true);

	useLayoutEffect(() => {
		if (!priceStore.price && !isShowSplash) navigate('/home', { replace: true });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [priceStore.price, isShowSplash]);

	useLayoutEffect(() => {
		window.electronAPI.onError((code: number, e?: unknown) => {
			layoutStore.setLoading(false);
			layoutStore.setError(getError(code as keyof typeof ERROR_CODES, e));
		});

		window.electronAPI.onSuccess((code: number) => {
			if (code === 100) priceStore.onSendPriceFinally();
			if (code === 200) priceStore.onAddImageFinally();
		});

		window.electronAPI.onWillClose(() => {
			if (priceStore.isNeedSaved) {
				layoutStore.alert(
					'Есть не сохранённые изменения. Вы действительно хотите закрыть программу?',
					[
						{ title: 'Отмена' },
						{
							title: 'Закрыть',
							onClick: () => window.electron.allowClose(),
						},
					],
					'warning',
				);
			} else {
				window.electron.allowClose();
			}
		});
	}, []);

	const handleHideSplash = () => setIsShowSplash(false);

	return (
		<Div>
			<FormsImageModalScreen />
			{layoutStore.loading ? <Loader /> : null}
			<LayoutAlertScreen />
			<ErrorSplashScreen />
			{isShowSplash ? <LayouSplashScreen onHide={handleHideSplash} /> : null}

			<HStack>
				<LayoutSidebarContainer />

				<Stack className="h-screen w-full max-h-screen">
					<LayoutHeaderContainer />

					<Div className="h-full overflow-x-hidden overflow-y-auto !p-6">
						<Suspense>
							<Outlet />
						</Suspense>
					</Div>
				</Stack>
			</HStack>
		</Div>
	);
};

const LayoutScreen = observer(Component);

export default LayoutScreen;
