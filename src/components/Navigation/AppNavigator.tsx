import React from 'react';
import {
	createStackNavigator,
	TransitionPresets,
} from '@react-navigation/stack';
import { NavigatorScreenParams } from '@react-navigation/native';

import { AppRouteName } from '../../constants/navigation';
import { Upload } from '../../screens/Upload';
import { Signup } from '../../screens/Signup';
import { ConfirmSignupCode } from '../../screens/ConfirmSignupCode';
import { Login } from '../../screens/Login';
import {
	AppHomeNavigatorParamList,
	AppHomeNavigator,
} from './AppHomeNavigator';

export type AppNavigatorParamList = {
	[AppRouteName.HomeNavigator]: NavigatorScreenParams<AppHomeNavigatorParamList>;
	[AppRouteName.UploadScreen]: undefined;
	[AppRouteName.SignupScreen]: undefined;
	[AppRouteName.ConfirmSignupCodeScreen]: {
		email: string;
		password: string;
	};
	[AppRouteName.LoginScreen]: undefined;
};

const { Navigator, Screen } = createStackNavigator<AppNavigatorParamList>();

export const AppNavigator: React.FC = () => {
	return (
		<Navigator
			initialRouteName={AppRouteName.HomeNavigator}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Screen name={AppRouteName.HomeNavigator} component={AppHomeNavigator} />
			<Screen
				name={AppRouteName.UploadScreen}
				component={Upload}
				options={TransitionPresets.ModalSlideFromBottomIOS}
			/>
			<Screen name={AppRouteName.SignupScreen} component={Signup} />
			<Screen
				name={AppRouteName.ConfirmSignupCodeScreen}
				component={ConfirmSignupCode}
			/>
			<Screen name={AppRouteName.LoginScreen} component={Login} />
		</Navigator>
	);
};

export default AppNavigator;
