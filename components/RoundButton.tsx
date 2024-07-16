import Colors from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

type RoundButtonProps = {
	text: string;
	icon: typeof Ionicons.defaultProps;
	onPress: () => void;
};

const RoundButton = (props: RoundButtonProps) => {
	return (
		<TouchableOpacity style={styles.container} onPress={props.onPress}>
			<View style={styles.circle}>
				<Ionicons name={props.icon} size={30} color={Colors.dark} />
			</View>
			<Text style={styles.label}>{props.text}</Text>
		</TouchableOpacity>
	);
};

export default RoundButton;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		gap: 10,
	},
	circle: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: Colors.lightGray,
		justifyContent: 'center',
		alignItems: 'center',
	},
	label: {
		fontSize: 12,
		fontWeight: 'bold',
		color: Colors.dark,
	},
});
