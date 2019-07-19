import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Badge, Text, Button } from 'native-base';
import { Location, Permissions } from 'expo';
import MapView, { Marker, OverlayComponent } from 'react-native-maps';
import ipAddress from '../../config';
export default class LocalScreen extends React.Component {
	constructor() {
		super();
		this.state = { latitude: null, longitude: 0, logPosition: [] };
	}
	componentWillMount() {
		this._getLocationAsync();
	}

	_getLocationAsync = async () => {
		var { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			this.setState({
				errorMessage: 'Permission to access location was denied'
			});
		}

		var location = await Location.getCurrentPositionAsync({});
		Location.watchPositionAsync({ distanceInterval: 1 }, (location) => {
			this.setState({ latitude: location.coords.latitude, longitude: location.coords.longitude });
		});
		this.setState({ latitude: location.coords.latitude, longitude: location.coords.longitude });
	};

	onPictureSaved = async () => {
		await fetch(ipAddress + '/saveMarker', {
			method: 'POST',
			headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
			body: `latitude=${this.state.latitude}&longitude=${this.state.longitude}`
		});
	};

	onPictureLoad = async () => {
		fetch(ipAddress + '/loadMarker')
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				this.setState({ logPosition: data.markers });
			})
			.catch((error) => {
				console.log('Request failed', error);
			});
	};
	render() {
		var markerList = [];
		console.log(this.state.logPosition);
		if (this.state.logPosition) {
			markerList = this.state.logPosition.map((data, i) => (
				<Marker key={i} pinColor="blue" coordinate={{ latitude: data.latitude, longitude: data.longitude }} />
			));
		}
		return this.state.latitude ? (
			<View style={{ flex: 1 }}>
				<MapView
					style={{
						flex: 1,
						flexDirection: 'column'
					}}
					initialRegion={{
						latitude: this.state.latitude,
						longitude: this.state.longitude,
						latitudeDelta: 0.0922,
						longitudeDelta: 0.0421
					}}
				>
					<Marker
						key={'currentPos'}
						pinColor="red"
						title="Hello"
						description="I'am here"
						coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}
					/>
					{markerList}
				</MapView>
				<View
					style={{
						position: 'absolute',
						bottom: 20,
						width: '100%'
					}}
				>
					<View style={{ alignSelf: 'center' }}>
						<Badge info>
							<Text style={{ color: 'white' }}>
								{this.state.latitude} , {this.state.longitude}
							</Text>
						</Badge>
						<View style={{ flexDirection: 'row', justifyContent: 'space-around', marginTop: 5 }}>
							<Button
								success
								onPress={() => {
									this.onPictureSaved();
								}}
							>
								<Text>Save</Text>
							</Button>
							<Button
								primary
								onPress={() => {
									this.onPictureLoad();
								}}
							>
								<Text>Load</Text>
							</Button>
						</View>
					</View>
				</View>
			</View>
		) : (
			<View />
		);
	}
}
const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
});
