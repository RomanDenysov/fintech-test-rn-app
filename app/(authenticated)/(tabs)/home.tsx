import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import React from 'react';
import Colors from '@/constants/Colors';
import RoundButton from '@/components/RoundButton';
import Dropdown from '@/components/Dropdown';
import { useBalanceStore } from '@/store/balanceStore';

const Page = () => {
	const { balance, runTransaction, transactions, clearTransactions } = useBalanceStore();

	const onAddMoney = () => {
		console.log('Add Money');
	};

	return (
		<ScrollView style={{ backgroundColor: Colors.background }}>
			<View style={styles.account}>
				<View style={styles.row}>
					<Text style={styles.balance}>{balance()}</Text>
					<Text style={styles.currency}>$</Text>
				</View>
			</View>

			<View style={styles.actionRow}>
				<RoundButton icon={'add'} text='Add Money' onPress={onAddMoney} />
				<RoundButton icon={'refresh'} text='Exchange' onPress={onAddMoney} />
				<RoundButton icon={'list'} text='Details' onPress={onAddMoney} />
				{/* <RoundButton icon={'add'} text='Add Money' onPress={onAddMoney} /> */}
			</View>
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	account: {
		margin: 80,
		alignItems: 'center',
	},
	row: {
		flexDirection: 'row',
		alignItems: 'flex-end',
		justifyContent: 'center',
		gap: 5,
	},
	balance: {
		fontSize: 50,
		fontWeight: 'bold',
		// color: Colors.primary,
	},
	currency: {
		fontSize: 20,
		fontWeight: '500',
		marginLeft: 5,
		// color: Colors.primary,
	},
	actionRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 20,
	},
	transactions: {
		marginHorizontal: 20,
		padding: 14,
		backgroundColor: '#fff',
		borderRadius: 16,
		gap: 20,
	},
});

export default Page;
