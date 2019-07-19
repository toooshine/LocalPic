import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import HomeScreen from '../Screen/HomeScreen';
import LocalScreen from '../Screen/LocalScreen';
import TchatScreen from '../Screen/TchatScreen';

var BottomNavigator = createBottomTabNavigator(
	{
		Home: HomeScreen,
		Local: LocalScreen,
		Tchat: TchatScreen
	},
	{
		defaultNavigationOptions: ({ navigation }) => ({
			tabBarIcon: ({ tintColor }) => {
				var iconName;
				if (navigation.state.routeName == 'Home') {
					iconName = 'md-home';
				} else if (navigation.state.routeName == 'Local') {
					iconName = 'ios-body';
				} else if (navigation.state.routeName == 'Tchat') {
					iconName = 'ios-chatbubbles';
				}

				return <Ionicons name={iconName} size={25} color={tintColor} />;
			}
		}),
		tabBarOptions: {
			activeTintColor: 'black',
			inactiveTintColor: 'gray',
			style: {
				backgroundColor: '#c7ecee'
			}
		}
	}
);

export default (Navigation = createAppContainer(BottomNavigator));
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'black',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
