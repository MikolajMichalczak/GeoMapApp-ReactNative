import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MyButton from "./MyButton"

class ListItem extends Component {
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
            img1: require('./checkBtn.png'),
            img2: require('./checkBtn2.png'),
            checked: this.props.selected
        };
        this.onPressBtn = this.onPressBtn.bind(this);
    }

    onPressBtn() {
        this.setState({ checked: !this.state.checked });
        this.props.handleBox(this.props.timestamp)
    }

    render() {
        return (
            <View style={styles.user}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ width: 60, height: 60, }} source={require('./mapPic.png')} />
                </View>
                <View style={styles.coords}>
                    <Text style={styles.text1}>
                        timestamp: {this.props.timestamp}
                    </Text>
                    <Text style={styles.text}>
                        latitude: {this.props.latitude}
                    </Text>
                    <Text style={styles.text}>
                        longitude: {this.props.longitude}
                    </Text>
                </View>
                <View style={styles.btn}>
                    <TouchableOpacity onPress={() => this.onPressBtn()}>
                        <Image
                            source={this.state.checked ? this.state.img2 : this.state.img1}
                            style={styles.checkBtn}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    user: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: "space-between",
        marginBottom: 17
    },
    coords: {
        flex: 2,
        flexDirection: 'column',
        justifyContent: "space-between",
        alignItems: 'center'
    },
    text: {
        color: 'grey'
    },
    btn: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    checkBtn: {
        width: 30,
        height: 30
    }
});

export default ListItem;