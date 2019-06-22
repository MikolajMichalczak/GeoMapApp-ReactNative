import React, { Component } from 'react';
import { MapView } from 'expo';

class Map extends Component {
    static navigationOptions = {
        //header: null,
        title: "Mapa",
        headerStyle: {
            backgroundColor: '#303F9F'
        },
        headerTitleStyle: {
            color: "#ffffff"
        }
    }
    constructor(props) {
        super(props);
    }
    render() {
        console.log('data', this.props.navigation.state.params.data);
        let [lat, long] = [50.111, 20.111];
        if (!!this.props.navigation.state.params.data[0]) {
            lat = this.props.navigation.state.params.data[0].latitude;
            long = this.props.navigation.state.params.data[0].longitude;
        }
        return (
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: lat,
                    longitude: long,
                    latitudeDelta: 0.001,
                    longitudeDelta: 0.001,
                }}>
                {
                    this.props.navigation.state.params.data.map((item, i) => (
                        <MapView.Marker
                            key={i}
                            coordinate={{
                                latitude: item.latitude,
                                longitude: item.longitude,
                            }}
                            title={'' + item.timestamp}
                            description={item.longitude + ' ' + item.latitude}
                        />
                    ))
                }
            </MapView>
        );
    }
}
export default Map;