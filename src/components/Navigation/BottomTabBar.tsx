import { BottomTabBarProps as RNBottomTabBarProps } from '@react-navigation/bottom-tabs';
import {
	BottomNavigation,
	BottomNavigationTab,
	Icon,
} from '@ui-kitten/components';
import React, { useCallback } from 'react';
import { View } from 'react-native';
import { AppRouteName, AppHomeRouteName } from '../../constants/navigation';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BOTTOM_TAB_ROUTES: Array<string> = [
	AppHomeRouteName.FeedScreen,
	AppRouteName.UploadScreen,
	AppHomeRouteName.MeScreen,

];

// <<<<<<< HEAD
// const AUTHENTICATED_ROUTES_SET = new Set([
// 	AppRouteName.UploadScreen,
// ] as Array<string>);
// =======
// >>>>>>> c517bb26f6b419b7d1759ddc8274f315fb1f12da

export type BottomTabBarProps = Pick<
	RNBottomTabBarProps,
	'navigation' | 'state'
>;

const mockIsAuthenticated = () => {
	return false;
};

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
	navigation,
	state,
}) => {
	const { navigate } = navigation;
	const { index: routeIndex, routeNames } = state;
	const { bottom: SafeAreaBottom } = useSafeAreaInsets();

	const onSelect = useCallback(
		(index: number) => {
			const currentTab = BOTTOM_TAB_ROUTES[index];

			if (AUTHENTICATED_ROUTES_SET.has(currentTab)) {
				if (!mockIsAuthenticated()) {
					navigate(AppRouteName.LoginScreen);
					return;
				}
			}

			navigate(currentTab);
		},
		[navigate],
	);

	return (
		<BottomNavigation
			appearance="noIndicator"
			selectedIndex={BOTTOM_TAB_ROUTES.indexOf(routeNames[routeIndex])}
			onSelect={onSelect}
			style={{ paddingBottom: SafeAreaBottom }}
		>
			<BottomNavigationTab title="Home" />
			<BottomNavigationTab
				icon={
					<View>
						<Icon
							name="plus"
							fill="white"
							style={{
								display: 'flex',
								alignSelf: 'center',
								width: 52,
								height: 35,
								backgroundColor: '#FF5722',
								borderRadius: 10,
								overflow: 'hidden',
							}}
						/>
					</View>
				}
			/>
			<BottomNavigationTab title="Me" />
		</BottomNavigation>
	);
};

export default BottomTabBar;
