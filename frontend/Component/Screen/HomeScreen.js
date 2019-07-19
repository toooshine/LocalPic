import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';

export default class HomeScreen extends React.Component {
	render() {
		return (
			<ImageBackground style={{ flex: 1 }} source={require('../../assets/LocaPic.jpg')}>
				<View style={styles.container}>
					<Text style={{ color: '#3498db', fontSize: 50, fontWeight: 'bold' }}>Find</Text>
					<Text style={{ color: '#3498db', fontSize: 50, fontWeight: 'bold' }}>your</Text>
					<Text style={{ color: '#3498db', fontSize: 50, fontWeight: 'bold' }}>way !</Text>
				</View>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start',
		top: 30
	}
});
