import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import { useState } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
} from "react-native";

const Page = () => {
	const [countryCode, setCountryCode] = useState("+421");
	const [phoneNumber, setPhoneNumber] = useState("");
	const keyboardVerticalOffset = Platform.OS === "ios" ? 90 : 80;
	const router = useRouter();
	const { signUp } = useSignUp();

	const onSignup = async () => {
		const fullPhoneNumber = `${countryCode}${phoneNumber}`;
		try {
			await signUp!.create({
				phoneNumber: fullPhoneNumber,
			});
			router.push({
				pathname: "/verify/[phone]",
				params: { phone: fullPhoneNumber },
			});
		} catch (error) {
			console.error("Failed to sign up:", error);
		}
	};

	return (
		<KeyboardAvoidingView
			style={{ flex: 1 }}
			behavior="padding"
			keyboardVerticalOffset={keyboardVerticalOffset}
		>
			<View style={defaultStyles.container}>
				<Text style={defaultStyles.header}>Let's get started!</Text>
				<Text style={defaultStyles.descriptionText}>
					Enter your phone number. We will send you a confirmation
					code there.
				</Text>
				<View style={styles.inputConteiner}>
					<TextInput
						style={styles.input}
						placeholderTextColor={Colors.gray}
						placeholder="Country code"
						keyboardType="phone-pad"
						value={countryCode}
					/>
					<TextInput
						style={[styles.input, { flex: 1 }]}
						placeholderTextColor={Colors.gray}
						placeholder="Phone number"
						keyboardType="phone-pad"
						onChangeText={setPhoneNumber}
					/>
				</View>

				<View style={{ flexDirection: "row", gap: 10 }}>
					<Text style={{ fontSize: 18, fontWeight: "500" }}>
						Already have an account?
					</Text>
					<Link href={"/login"} asChild>
						<TouchableOpacity>
							<Text style={defaultStyles.textLink}>Log in</Text>
						</TouchableOpacity>
					</Link>
				</View>
				<View style={{ flex: 1 }} />
				<TouchableOpacity
					style={[
						defaultStyles.pillButton,
						phoneNumber !== "" ? styles.enabled : styles.disabled,
						{ marginBottom: 20 },
					]}
					onPress={onSignup}
				>
					<Text style={defaultStyles.buttonText}>Sign up</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
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
