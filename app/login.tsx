import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { isClerkAPIResponseError, useSignIn } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { Link, useRouter } from "expo-router";
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	Alert,
} from 'react-native';

enum SignInType {
	Phone,
	Email,
	Google,
	Apple,
}

const Page = () => {
	const [countryCode, setCountryCode] = useState('+421');
	const [phoneNumber, setPhoneNumber] = useState('');
	const keyboardVerticalOffset = Platform.OS === 'ios' ? 90 : 80;
	const router = useRouter();
	const { signIn } = useSignIn();

	const onSignIn = async (type: SignInType) => {
		if (type === SignInType.Phone) {
			try {
				const fullPhoneNumber = `${countryCode}${phoneNumber}`;
				const { supportedFirstFactors } = await signIn!.create({
					identifier: fullPhoneNumber,
				});
				const firstPhoneFactor: any = supportedFirstFactors.find((factor: any) => {
					return factor.strategy === 'phone_code';
				});

				const { phoneNumberId } = firstPhoneFactor;

				await signIn!.prepareFirstFactor({
					strategy: 'phone_code',
					phoneNumberId,
				});

				router.push({
					pathname: '/verify/[phone]',
					params: { phone: fullPhoneNumber, signin: 'true' },
				});
			} catch (error) {
				console.error('Failed to sign in:', JSON.stringify(error, null, 2));
				if (isClerkAPIResponseError(error)) {
					if (error.errors[0].code === 'form_identifier_not_found') {
						Alert.alert('User not found! Error: ', error.errors[0].message);
					}
				}
			}
		} else {
		}
		if (type === SignInType.Email) {
			router.push({
				pathname: '/verify/[phone]',
				params: { signin: 'true' },
			});
		}
	};

	return (
		<>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior='padding'
				keyboardVerticalOffset={keyboardVerticalOffset}
			>
				<View style={defaultStyles.container}>
					<Text style={defaultStyles.header}>Welcome back</Text>
					<Text style={defaultStyles.descriptionText}>
						Enter the phone number associated with your account
					</Text>
					<View style={styles.inputConteiner}>
						<TextInput
							style={[styles.input, { maxWidth: 100 }]}
							placeholderTextColor={Colors.gray}
							placeholder={countryCode || '+421'}
							keyboardType='phone-pad'
							autoComplete='tel-country-code'
							value={countryCode}
							onChangeText={setCountryCode}
						/>
						<TextInput
							style={[styles.input, { flex: 1 }]}
							placeholderTextColor={Colors.gray}
							placeholder='Phone number'
							keyboardType='phone-pad'
							autoComplete='tel'
							onChangeText={setPhoneNumber}
						/>
					</View>

					<TouchableOpacity
						style={[
							defaultStyles.pillButton,
							phoneNumber !== '' ? styles.enabled : styles.disabled,
							{ marginBottom: 20 },
						]}
						onPress={() => onSignIn(SignInType.Phone)}
					>
						<Text style={defaultStyles.buttonText}>Continue</Text>
					</TouchableOpacity>

					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							gap: 16,
						}}
					>
						<View
							style={{
								flex: 1,
								height: StyleSheet.hairlineWidth,
								backgroundColor: Colors.gray,
							}}
						/>
						<Text style={{ color: Colors.gray, fontSize: 20 }}>or</Text>
						<View
							style={{
								flex: 1,
								height: StyleSheet.hairlineWidth,
								backgroundColor: Colors.gray,
							}}
						/>
					</View>

					<TouchableOpacity
						onPress={() => onSignIn(SignInType.Email)}
						style={[
							defaultStyles.pillButton,
							{
								backgroundColor: '#fff',
								flexDirection: 'row',
								gap: 16,
								marginTop: 20,
							},
						]}
					>
						<Ionicons name='mail' size={24} color={Colors.dark} />
						<Text style={[defaultStyles.buttonText, { color: Colors.dark }]}>
							Sign in with email
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => onSignIn(SignInType.Google)}
						style={[
							defaultStyles.pillButton,
							{
								backgroundColor: '#ff2121',
								flexDirection: 'row',
								gap: 16,
								marginTop: 20,
							},
						]}
					>
						<Ionicons name='logo-google' size={24} color={'#fff'} />
						<Text style={[defaultStyles.buttonText, { color: '#fff' }]}>
							Sign in with email
						</Text>
					</TouchableOpacity>
					<TouchableOpacity
						onPress={() => onSignIn(SignInType.Apple)}
						style={[
							defaultStyles.pillButton,
							{
								backgroundColor: Colors.dark,
								flexDirection: 'row',
								gap: 16,
								marginTop: 20,
								marginBottom: 20,
							},
						]}
					>
						<Ionicons name='logo-apple' size={24} color={Colors.lightGray} />
						<Text style={[defaultStyles.buttonText, { color: Colors.lightGray }]}>
							Sign in with email
						</Text>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
			<StatusBar style='dark' />
		</>
	);
};

const styles = StyleSheet.create({
	inputConteiner: {
		marginVertical: 40,
		flexDirection: "row",
	},
	input: {
		backgroundColor: Colors.lightGray,
		padding: 20,
		borderRadius: 16,
		fontSize: 20,
		marginRight: 10,
	},
	enabled: {
		backgroundColor: Colors.primary,
	},
	disabled: {
		backgroundColor: Colors.primaryMuted,
	},
});

export default Page;
