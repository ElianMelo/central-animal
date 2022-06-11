import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity,
} from 'react-native';

const home = require('../../assets/home.png');
const maps = require('../../assets/maps.png');
const animals = require('../../assets/animals.png');
const institutions = require('../../assets/institutions.png');
const login = require('../../assets/login.png');

export default class Footer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
        };
    }

    render() {
        return (
            <View style={styles.menu}>
                <View style={styles.menuImageLine}>
                    <TouchableOpacity
                        style={styles.itemCol}
                        onPress={() =>
                            this.props.navigation.navigate('Home')
                        }
                    >
                        <Image
                            style={styles.menuImage}
                            source={home}
                        />
                        <Text
                            style={styles.textFooter}
                        >
                            Home
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.itemCol}
                        onPress={() =>
                            this.props.navigation.navigate('Map')
                        }
                    >
                        <Image
                            style={styles.menuImage}
                            source={maps}
                        />
                        <Text
                            style={styles.textFooter}
                        >
                            Mapa
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.itemCol}
                    >
                        <Image
                            style={styles.menuImage}
                            source={animals}
                        />
                        <Text
                            style={styles.textFooter}
                        >
                            Animais
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.itemCol}
                        onPress={() =>
                            this.props.navigation.navigate('Institutions')
                        }
                    >
                        <Image
                            style={styles.menuImage}
                            source={institutions}
                        />
                        <Text
                            style={styles.textFooter}
                        >
                            Instituicoes
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.itemCol}
                        onPress={() =>
                            this.props.navigation.navigate('InstitutionManagement')
                        }
                    >
                        <Image
                            style={styles.menuImage}
                            source={login}
                        />
                        <Text
                            style={styles.textFooter}
                        >
                            Login
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemCol: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    },
    menu: {
        backgroundColor: 'white',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        padding: 14,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowOpacity: 1,
        shadowColor: '#000000',
        elevation: 4,
    },
    menuImageLine: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'space-between',
        marginHorizontal: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },
    menuImage: {
        width: 30,
        height: 30,
    },
    textFooter: {
        color: 'black',
        fontSize: 11
    }
});
