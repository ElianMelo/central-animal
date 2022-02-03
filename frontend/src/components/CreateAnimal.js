import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    Button
} from 'react-native';

export default class CreateAnimal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
        };
    }

    render() {
        return (
            <View style={styles.body}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        height: "100%"
    },
});
