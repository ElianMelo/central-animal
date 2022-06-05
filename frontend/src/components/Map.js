import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image,
} from 'react-native';

import Footer from './Footer';

import RequestService from '../services/RequestService';

export default class Map extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            titleText: "Central Animal",
            descriptionText: "Aplicativo pra animais em adoção",
        };
    }

    componentDidMount() {
        this.loadAnimals();
    }

    loadAnimals = async() => {
        let animals = await RequestService.getTenRandomAnimals();
        this.setState({animals})
    }

    renderItem = ({ item }) => (
        <TouchableOpacity style={styles.cardBox}>
            <Image
                style={styles.roundCardImage}
                source={{uri: item.image}}
            />
            <View style={styles.cardColumn}>
                <Text style={styles.nameTxt}>
                    Central Animal
                </Text>
            </View>
        </TouchableOpacity>
    );

    render() {
        return (
            <View style={styles.body}>
                <View style={styles.inputBox}>
                    <Text style={styles.sessionDescriptionTxt}>
                        Mapa
                    </Text>
                    <Text style={styles.sessionDescriptionLowerTxt}>
                        Animais na sua região.
                    </Text>
                </View>
                <FlatList
                    data={this.state.animals}
                    style={styles.bottomMargin}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                />
                <Footer navigation={this.state.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        paddingTop: 30,
        height: "100%",
        backgroundColor: "white"
    },
    bottomMargin: {
        width: "100%",
        marginBottom: 70
    },
    inputBox: {
        padding: 5,
        marginRight: 16,
        marginLeft: 16,
    },
    sessionDescriptionTxt: {
        marginBottom: 6,
        marginLeft: 6,
        textAlign: "left",
        color: "black",
        fontSize: 26,
        fontWeight: "500"
    },
    sessionDescriptionLowerTxt: {
        marginBottom: 20,
        marginLeft: 6,
        textAlign: "left",
        color: "black",
        fontSize: 14,
        fontWeight: "300"
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
    roundCardImage: {
        marginRight: 'auto',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        width: "100%",
        height: 200,
    },                
    cardColumn: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameTxt: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "left",
        color: "black",
        textAlign: 'center'
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
});
