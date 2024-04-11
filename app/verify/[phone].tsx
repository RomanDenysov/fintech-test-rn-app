import Colors from "@/constants/Colors";
import { defaultStyles } from "@/constants/Styles";
import { useSignIn, useSignUp } from "@clerk/clerk-expo";
import { Link, useLocalSearchParams } from "expo-router";
import { Fragment, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import {
	CodeField,
	Cursor,
	useBlurOnFulfill,
	useClearByFocusCell,
} from "react-native-confirmation-code-field";
const CELL_COUNT = 6;

const Phone = () => {
	const { phone, signin } = useLocalSearchParams<{
		phone: string;
		signin?: string;
	}>();

	const [code, setCode] = useState("");

	const { signIn } = useSignIn();
	const { signUp, setActive } = useSignUp();

	const ref = useBlurOnFulfill({ value: code, cellCount: CELL_COUNT });
	const [props, getCellOnLayoutHandler] = useClearByFocusCell({
		value: code,
		setValue: setCode,
	});

	useEffect(() => {
		if (code.length === 6) {
			verifySignIn();
		} else {
			verifyCode();
		}
	}, [code]);
	const verifyCode = async () => {};

	const verifySignIn = async () => {};

	return (
		<View style={defaultStyles.container}>
			<Text style={defaultStyles.header}>6-digit code</Text>
			<Text style={defaultStyles.descriptionText}>
				Code sent tp {phone} unless you already have an account.
			</Text>

			<CodeField
				ref={ref}
				{...props}
				value={code}
				onChangeText={setCode}
				cellCount={CELL_COUNT}
				rootStyle={styles.codeFieldRoot}
				keyboardType="number-pad"
				textContentType="oneTimeCode"
				renderCell={({ index, symbol, isFocused }) => (
					<Fragment key={index}>
						<View
							// Make sure that you pass onLayout={getCellOnLayoutHandler(index)} prop to root component of "Cell"
							onLayout={getCellOnLayoutHandler(index)}
							key={index}
							style={[
								styles.cellRoot,
								isFocused && styles.focusCell,
							]}
						>
							<Text style={styles.cellText}>
								{symbol || (isFocused ? <Cursor /> : null)}
							</Text>
						</View>
						{index === 2 ? (
							<View
								key={`separator-${index}`}
								style={styles.separator}
							/>
						) : null}
					</Fragment>
				)}
			/>

			<View style={{ flexDirection: "row", gap: 10 }}>
				<Text style={{ fontSize: 18, fontWeight: "500" }}>
					Already have an account?
				</Text>
				<Link href={"/login"} replace asChild>
					<TouchableOpacity>
						<Text style={defaultStyles.textLink}>Log in</Text>
					</TouchableOpacity>
				</Link>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	codeFieldRoot: {
		marginVertical: 20,
		marginLeft: "auto",
		marginRight: "auto",
		gap: 12,
	},
	cellRoot: {
		width: 45,
		height: 60,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: Colors.lightGray,
		borderRadius: 8,
	},
	cellText: {
		color: "#000",
		fontSize: 36,
		textAlign: "center",
	},
	focusCell: {
		paddingBottom: 8,
	},
	separator: {
		width: 10,
		height: 2,
		backgroundColor: Colors.gray,
		alignSelf: "center",
	},
});

export default Phone;
