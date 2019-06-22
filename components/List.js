import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, FlatList, Button, Alert } from 'react-native';
import { AsyncStorage } from "react-native";
import { Location, Permissions } from 'expo';
import { ActivityIndicator } from 'react-native';
import MyButton from "./MyButton";
import ListItem from './ListItem';

class List extends Component {
    static navigationOptions = {
        //header: null,
        title: "Powrót",
        headerStyle: {
            backgroundColor: '#303F9F',
        },
        headerTitleStyle: {
            color: "#ffffff"
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            data: '',
            indicator: false
        };
        this.getAllData()
        this.check = this.check.bind(this);
    }

    setPermissions = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            alert('odmawiam przydzielenia uprawnień do czytania lokalizacji')
        }
    }
    componentDidMount = async () => {
        await this.setPermissions()
    }

    getPosition = async () => {
        this.setState({ indicator: true })
        let position = await Location.getCurrentPositionAsync({})
        this.setState({ indicator: false })
        Alert.alert('Pozycja', 'Pobrano lokalizacje, czy zapisać?',
            [
                { text: 'Tak', onPress: () => this.setData({ timestamp: position.timestamp, latitude: position.coords.latitude, longitude: position.coords.longitude, selected: false }) },
                { text: 'Nie', onPress: () => console.log('Cancel Pressed') },
            ])
    }

    setData = async (pos) => {
        //console.log('setdata', pos);
        await AsyncStorage.setItem('key-' + pos.timestamp, JSON.stringify(pos));
        this.getAllData()
    }

    getAllData = async () => {
        let keys = await AsyncStorage.getAllKeys();
        let stores = await AsyncStorage.multiGet(keys);
        let posTab = []
        let maps = stores.map((result, i, store) => {
            let key = store[i][0];
            let value = store[i][1];
            posTab.push(JSON.parse(value))
        });
        this.setState({ data: posTab })
        console.log('data', this.state.data);
    }
    removeAll = async () => {
        this.setState({ data: [] });
        await AsyncStorage.clear();
    }
    check(timestamp) {
        let tab = [];
        for (let item of this.state.data) {
            if (item.timestamp == timestamp) {
                item.selected = !item.selected;
            }
            tab.push(item);
        }
        this.setState({ data: tab });
        //console.log(this.state.data)
        this.update();
    }
    async update() {
        await AsyncStorage.clear();
        for (let item of this.state.data)
            this.setData(item);
    }

    render() {
        return (
            <View style={styles.cont}>
                <View style={styles.btn}>
                    <View style={styles.btnRow}>
                        <MyButton text={"Pobierz i zapisz pozycje"} handleBox={this.getPosition} />
                        <MyButton text={"Usuń wszystkie dane"} handleBox={this.removeAll} />
                    </View>
                    <View style={styles.oneBtn}>
                        <MyButton width={200} text={"Przejdź do mapy"} handleBox={() => this.props.navigation.navigate('s3', { data: this.state.data.filter(item => item.selected) })} />
                    </View>
                </View>
                <View style={styles.list}>
                    <FlatList
                        data={
                            this.state.data
                        }
                        renderItem={({ item }) => <ListItem handleBox={this.check} timestamp={item.timestamp} latitude={item.latitude} longitude={item.longitude} selected={item.selected} />}
                        keyExtractor={(item, index) => index.toString()}

                    />
                </View>
                {
                    this.state.indicator ?
                        <ActivityIndicator style={{ flex: 1, position: 'absolute', alignSelf: 'center', marginTop: '50%' }} size="large" color="#0000ff" />
                        :
                        null
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1,
    },
    btn: {
        flex: 2,
        marginBottom: '5%'
    },
    btnRow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    oneBtn: {
        flex: 1,
        alignItems: 'center'
    },
    list: {
        flex: 8,
    }
});

export default List;