import React from 'react';
import { View, ScrollView, KeyboardAvoidingView, StyleSheet, YellowBox, ImageBackground } from 'react-native';
import { ListItem } from 'react-native-elements';
import { Item, Input, Button, Text } from 'native-base';
import ipAddress from '../../config';
import socketIOClient from 'socket.io-client';
console.ignoredYellowBox = [ 'Remote debugger' ];

YellowBox.ignoreWarnings([
	'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
]);
export default class TchatScreen extends React.Component {
	constructor() {
		super();
		this.state = { messageList: [], messageToSend: '' };
	}
	componentDidMount() {
		this.socket = socketIOClient(ipAddress);
		this.socket.on('sendMessage', (message) => {
			console.log(message);
			var messageListeCopy = [ ...this.state.messageList ];
			messageListeCopy.push(message);
			this.setState({ messageList: messageListeCopy, messageToSend: '' });
		});
	}

	render() {
		var renderMessage = this.state.messageList.map((data, i) => {
			console.log(data);
			return <ListItem key={i} title={data} style={{ borderColor: 'black' }} />;
		});
		return (
			<ImageBackground style={{ flex: 1 }} source={require('../../assets/tchat.jpg')}>
				<ScrollView style={{ marginTop: 20, borderTopWidth: 1, borderColor: 'black' }}>
					{renderMessage}
				</ScrollView>
				<KeyboardAvoidingView behavior="padding" enabled>
					<Item rounded style={{ borderColor: 'black' }}>
						<Input
							value={this.state.messageToSend}
							onChangeText={(messageToSend) => this.setState({ messageToSend })}
							placeholder="Your message"
						/>
					</Item>
					<View
						style={{
							alignSelf: 'center'
						}}
					>
						<Button rounded info onPress={() => this.socket.emit('sendMessage', this.state.messageToSend)}>
							<Text>Send Message</Text>
						</Button>
					</View>
				</KeyboardAvoidingView>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'flex-start'
	}
});
