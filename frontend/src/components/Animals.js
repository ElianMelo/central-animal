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

const image = require('../../assets/dog.jpg');

const DATA = [
    {
        id: "1",
        name: "Thor",
        img: image,
        description: "Lorem ipsum dolor, sit amet incidunt ut labore",
        sex: "macho",
        age: "2",
    },
    {
        id: "2",
        name: "Thor",
        img: image,
        description: "Lorem ipsum dolor, sit amet incidunt ut labore",
        sex: "macho",
        age: "2",
    },
    {
        id: "3",
        name: "Thor",
        img: image,
        description: "Lorem ipsum dolor, sit amet incidunt ut labore",
        sex: "macho",
        age: "2",
    },
    {
        id: "4",
        name: "Thor",
        img: image,
        description: "Lorem ipsum dolor, sit amet incidunt ut labore",
        sex: "macho",
        age: "2",
    },
    {
        id: "5",
        name: "Thor",
        img: image,
        description: "Lorem ipsum dolor, sit amet incidunt ut labore",
        sex: "macho",
        age: "2",
    },
    {
        id: "6",
        name: "Thor",
        img: image,
        description: "Lorem ipsum dolor, sit amet incidunt ut labore",
        sex: "macho",
        age: "2",
    },
    {
        id: "7",
        name: "Thor",
        img: image,
        description: "Lorem ipsum dolor, sit amet incidunt ut labore",
        sex: "macho",
        age: "2",
    },
    {
        id: "8",
        name: "Thor",
        img: image,
        description: "Lorem ipsum dolor, sit amet incidunt ut labore",
        sex: "macho",
        age: "2",
    },
];

export default class Animals extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
        };
    }

    renderItem = ({ item }) => (
        <TouchableOpacity style={styles.cardBox}>
            <Image
                style={styles.roundCardImage}
                source={item.img}
            />
            <View style={styles.cardColumn}>
                <Text style={styles.nameTxt}>
                    {item.name}
                </Text>
                <Text style={styles.descriptionTxt}>
                    {item.description}
                </Text>
                <View style={styles.cardLine}>
                    <Text><Text style={styles.descriptionBolderTxt}>Sexo:</Text> <Text style={styles.descriptionTxt}>{item.sex} </Text></Text>
                    <Text><Text style={styles.descriptionBolderTxt}>Idade:</Text> <Text style={styles.descriptionTxt}>{item.age}</Text></Text>
                </View>
            </View>
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
                    numColumns={2}
                />
                <Footer/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        height: "100%"
    },
    bottomMargin: {
        marginBottom: 70,
        width: "100%"
    },
    cardColumn: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    cardLine: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'space-between',
    },
    cardBox: {
        textAlign: "center",
        marginHorizontal: 6,
        marginVertical: 8,
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
        width: "47%"
    },
    nameTxt: {
        marginRight: 'auto',
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "left",
        color: "black"
    },
    descriptionTxt: {
        marginRight: 'auto',
        fontSize: 14,
        marginTop: 8,
        textAlign: "left",
        color: "black"
    },
    descriptionBolderTxt: {
        marginRight: 'auto',
        fontSize: 14,
        marginTop: 4,
        textAlign: "left",
        fontWeight: "bold",
        color: "black"
    },
    roundCardImage: {
        marginRight: 'auto',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        width: "100%",
        height: 100,
    },
});
