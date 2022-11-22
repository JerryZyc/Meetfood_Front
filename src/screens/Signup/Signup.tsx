import React, { useCallback } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import {
	BackIcon,
	Button,
	Input,
	SecureInput,
	Text,
} from '../../components/Common';
import { useForm } from '../../hooks/useForm';
import { userSignup } from '../../utils/auth';
import { AppRouteName } from '../../constants/navigation';
import { AppNavigatorParamList } from '../../components/Navigation/AppNavigator';

export const Signup: React.FC = () => {
	const { goBack, navigate } =
		useNavigation<StackNavigationProp<AppNavigatorParamList>>();

	const {
		values: { email, password },
		onFormValueChange,
	} = useForm({
		email: '',
		password: '',
	});

	const onSignup = useCallback(async () => {
		try {
			await userSignup(email, password);

			navigate(AppRouteName.ConfirmSignupCodeScreen, {
				email,
				password,
			});
		} catch (error: any) {
			console.debug(error);
		}
	}, [email, navigate, password]);

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
					text="Sign up"
					style={{
						alignSelf: 'center',
						marginTop: 16,
						marginBottom: 24,
					}}
				/>

				<Input
					label="Email"
					value={email}
					onChangeText={onFormValueChange('email')}
					keyboardType="email-address"
					style={{
						marginBottom: 24,
					}}
				/>

				<SecureInput
					label="Password"
					value={password}
					onChangeText={onFormValueChange('password')}
					keyboardType="default"
					style={{
						marginBottom: 24,
					}}
					caption={() =>
						!password ? (
							<Text
								category="c1"
								style={{
									color: '#7D7A77',
									marginBottom: 0,
								}}
								text="Your password must be at least 8 characters and contain uppercase letters, lowercase letters, and numbers"
							/>
						) : (
							<React.Fragment />
						)
					}
				/>

				<Button
					text="Continue"
					variant="primary"
					onPress={onSignup}
					style={{ marginBottom: 24 }}
				/>

				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Text text="Have an account?" style={{ marginRight: 4 }} />
					<Text
						text="Log in here"
						onPress={() => navigate(AppRouteName.LoginScreen)}
					/>
					<Text text="." />
				</View>
			</View>
		</SafeAreaView>
	);
};

export default Signup;
