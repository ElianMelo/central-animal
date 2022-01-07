import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Button,
} from 'react-native';
export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            titleText: "Central Animal",
            descriptionText: "Aplicativo pra animais em adoção",
        };
    }

    render() {
        return (
            <View>
                <View style={styles.headerBox}>
                    <Text style={styles.h1Text}>
                        {this.state.titleText}
                    </Text>
                    <Text style={styles.h2Text}>{this.state.descriptionText}</Text>
                </View>
                <View style={styles.buttonView}>
                    <Button
                        title="Instituição"
                        onPress={() =>
                            this.state.props.navigation.navigate('Institution')
                        }
                        color={"orange"}
                    >
                    </Button>
                </View>
                <View style={styles.buttonView}>
                    <Button
                        title="Instituições"
                        onPress={() =>
                            this.state.props.navigation.navigate('Institutions')
                        }
                        color={"orange"}
                    >
                    </Button>
                </View>
                <View style={styles.buttonView}>
                    <Button
                        title="Animais"
                        onPress={() =>
                            this.state.props.navigation.navigate('Animals')
                        }
                        color={"orange"}
                    >
                    </Button>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    buttonView: {
        paddingLeft: 32,
        paddingRight: 32,
        marginBottom: 8,
    },
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
    h2Text: {
        marginLeft: 6,
        textAlign: "center",
        color: "#000"
    },
});
