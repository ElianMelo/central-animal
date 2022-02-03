import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
} from 'react-native';

const map = require('../../assets/map.png');
const plus_circle = require('../../assets/plus-circle.png');
const building = require('../../assets/building.png');
const person_circle = require('../../assets/person-circle.png');

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
                    <TouchableOpacity>
                        <Image
                            style={styles.menuImage}
                            source={map}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Image
                            style={styles.menuImage}
                            source={plus_circle}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate('Institutions')
                        }
                    >
                        <Image
                            style={styles.menuImage}
                            source={building}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() =>
                            this.props.navigation.navigate('InstitutionManagement')
                        }
                    >
                        <Image
                            style={styles.menuImage}
                            source={person_circle}
                        />
                    </TouchableOpacity>
                    
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    menu: {
        backgroundColor: 'white',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        padding: 12,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
    },
    menuImageLine: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'space-between',
        marginHorizontal: 24,
    },
    menuImage: {
        width: 40,
        height: 40,
    }
});
