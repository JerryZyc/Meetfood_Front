import React, { useCallback } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BackIcon, Button, Input, Text } from '../../components/Common';
import { useForm } from '../../hooks/useForm';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppNavigatorParamList } from '../../components/Navigation/AppNavigator';
import { AppHomeRouteName, AppRouteName } from '../../constants/navigation';
import { userSignin, verifyConfirmationCode } from '../../utils/auth';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface ConfirmSignupCodeProps
	extends NativeStackScreenProps<
		AppNavigatorParamList,
		typeof AppRouteName.ConfirmSignupCodeScreen
	> {}

export const ConfirmSignupCode: React.FC<ConfirmSignupCodeProps> = ({
	route,
}) => {
	const { email, password } = route.params;
	const {
		values: { code },
		onFormValueChange,
	} = useForm({
		code: '',
	});
	const { goBack, navigate } =
		useNavigation<StackNavigationProp<AppNavigatorParamList>>();

	const onCodeConfirm = useCallback(async () => {
		try {
			await verifyConfirmationCode(email, code);

			try {
				console.log(await userSignin(email, password));

				navigate(AppRouteName.HomeNavigator, {
					screen: AppHomeRouteName.FeedScreen,
				});
			} catch (error: any) {
				// TOOD: add a modal to show the error msg
				// TODO: nav to login screen
			}
		} catch (error: any) {
			console.error(error?.message);
		}
	}, [code, email, navigate, password]);

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<View
				style={{
					height: 44,
					padding: 10,
				}}
			>
				<BackIcon size={25} color="#0F0E0E" onPress={goBack} />
			</View>

			<View style={{ flex: 1, paddingHorizontal: 16 }}>
				<Text
					category="h5"
					text="Verify Email"
					style={{
						alignSelf: 'center',
						marginTop: 16,
						marginBottom: 24,
					}}
				/>

				<Text
					text={`Please enter the 6 digit code sent to ${email}`}
					style={{
						alignSelf: 'center',
						marginTop: 16,
						marginBottom: 24,
					}}
				/>

				<Input
					// label="Code"
					value={code}
					onChangeText={onFormValueChange('code')}
					keyboardType="default"
					style={{
						marginBottom: 24,
					}}
				/>

				<Button text="Continue" variant="primary" onPress={onCodeConfirm} />
			</View>
		</SafeAreaView>
	);
};

export default ConfirmSignupCode;
