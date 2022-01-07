import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View
} from 'react-native';
export default class Institutions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            titleText: "Instituições",
        };
    }

    render() {
        return (
            <View>
                <View style={styles.headerBox}>
                    <Text style={styles.h1Text}>
                        {this.state.titleText}
                    </Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerBox: {
        textAlign: "center",
        marginBottom: 25,
    },
    h1Text: {
        fontSize: 32,
        margin: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "#000"
    },
});
