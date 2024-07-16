import Colors from '@/constants/Colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View, Text } from 'react-native';

const NavLayout = () => {
	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors.primary,
			}}
		>
			<Tabs.Screen
				name='home'
				options={{
					title: 'Home',
					tabBarIcon: ({ size, color }) => (
						<FontAwesome name='registered' size={size} color={color} />
					),
				}}
			/>

			<Tabs.Screen
				name='invest'
				options={{
					title: 'Invest',
					tabBarIcon: ({ size, color }) => (
						<FontAwesome name='line-chart' size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='transfers'
				options={{
					title: 'Transfers',
					tabBarIcon: ({ size, color }) => (
						<FontAwesome name='exchange' size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='crypto'
				options={{
					title: 'Ctypto',
					tabBarIcon: ({ size, color }) => (
						<FontAwesome name='bitcoin' size={size} color={color} />
					),
				}}
			/>
			<Tabs.Screen
				name='lifestyle'
				options={{
					title: 'Lifestyle',
					tabBarIcon: ({ size, color }) => (
						<FontAwesome name='th' size={size} color={color} />
					),
				}}
			/>
		</Tabs>
	);
};

const Layout = () => {
	return (
		<>
			<NavLayout />
			<StatusBar style='dark' />
		</>
	);
};

export default Layout;
