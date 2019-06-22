import React, { Component } from 'react';
import { View, Text, StyleSheet, TextInput } from 'react-native';
import MyButton from "./MyButton"
import List from "./List"

class Main extends Component {
    static navigationOptions = {
        header: null,
        title: "any title",
        headerStyle: {
            backgroundColor: "#000000",
        },
        headerTitleStyle: {
            color: "#ffffff"
        }
    }
    constructor(props) {
        super(props);
        this.state = {
        };
        this.start = this.start.bind(this);
    }

    start() {
        this.props.navigation.navigate("s2")
    }


    render() {
        return (
            <View style={styles.cont}>
                <View style={styles.background}>
                    <Text style={styles.text}>GeoMap App</Text>
                    <Text style={styles.text2}>find and save your position</Text>
                </View>
                <View style={styles.start}>
                    <MyButton width={70} text={"START"} handleBox={this.start} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    cont: {
        flex: 1
    },
    background: {
        flex: 1,
        backgroundColor: '#303F9F',
        justifyContent: "center",
        alignItems: "center",
    },
    start: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'center',
    },
    text: {
        color: 'white',
        fontSize: 50,
        fontWeight: 'bold'
    },
    text2: {
        color: 'white',
        fontSize: 20,
    }
});

export default Main;