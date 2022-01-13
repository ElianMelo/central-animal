import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';

import Footer from './Footer';

const image = require('../../assets/predio1.jpg');

const DATA = [
    {
        id: '1',
        txt: 'S.O.S Vida e Resgate',
        img: image,
        adress: 'Uberlândia, Santa Mônica'
    },
    {
        id: '2',
        txt: 'S.O.S Vida e Resgate',
        img: image,
        adress: 'Uberlândia, Santa Mônica'
    },
    {
        id: '3',
        txt: 'S.O.S Vida e Resgate',
        img: image,
        adress: 'Uberlândia, Santa Mônica'
    },
    {
        id: '4',
        txt: 'S.O.S Vida e Resgate',
        img: image,
        adress: 'Uberlândia, Santa Mônica'
    },
    {
        id: '5',
        txt: 'S.O.S Vida e Resgate',
        img: image,
        adress: 'Uberlândia, Santa Mônica'
    },
    {
        id: '6',
        txt: 'S.O.S Vida e Resgate',
        img: image,
        adress: 'Uberlândia, Santa Mônica'
    },
    {
        id: '7',
        txt: 'S.O.S Vida e Resgate',
        img: image,
        adress: 'Uberlândia, Santa Mônica'
    },
    {
        id: '8',
        txt: 'S.O.S Vida e Resgate',
        img: image,
        adress: 'Uberlândia, Santa Mônica'
    },
    {
        id: '9',
        txt: 'S.O.S Vida e Resgate',
        img: image,
        adress: 'Uberlândia, Santa Mônica'
    },
];

export default class Institutions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
        };
    }

    renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.cardBox}
            onPress={() =>
                this.props.navigation.navigate('Institution', {
                    institutionId: item.id
                })
            }
        >
            <View style={styles.cardImageLine}>
                <Image
                    style={styles.roundCardImage}
                    source={item.img}
                />
                <Text style={styles.titleTxt}>
                    {item.txt}
                </Text>
            </View>
            <Text style={styles.adressTxt}>{item.adress}</Text>
        </TouchableOpacity>
    );

    render() {
        return (
            <View style={styles.body}>
                
                <FlatList
                    data={DATA}
                    style={styles.bottomMargin}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />

                <Footer navigation={this.state.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        height: "100%"
    },
    bottomMargin: {
        marginBottom: 70
    },
    cardBox: {
        textAlign: "center",
        marginHorizontal: 16,
        marginVertical: 10,
        padding: 16,
        borderRadius: 16,
        backgroundColor: "white",        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    cardImageLine: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleTxt: {
        marginRight: 'auto',
        fontSize: 24,
        margin: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "black"
    },
    adressTxt: {
        fontWeight: 'bold',
        fontSize: 16,
        color: "black"
    },
    roundCardImage: {
        marginRight: 'auto',
        width: 60,
        height: 60,
        borderRadius: 30
    },
});
