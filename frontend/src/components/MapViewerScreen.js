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

import MapView from 'react-native-maps';

export default class MapViewerScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,          
        };
    }

    componentDidMount() {
        this.loadAnimals();
        this.setState({
            willFocusSubscription: this.state.props.navigation.addListener(
                'focus',
                () => {
                    this.loadAnimals();
                }
            )
        })
    }

    componentWillUnmount() {
        this.state.willFocusSubscription();
    }

    loadAnimals = async() => {
        // Carregar animais num raio de 5km
    }

    render() {
        return (
            <View style={styles.body}>
                <TouchableOpacity>
                    <Text style={styles.descriptionBolderTxtFilter}>Esse é um botão</Text>
                </TouchableOpacity>
                {/*<MapView
                    initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                />*/}
                <Footer />
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
    descriptionBolderTxtFilter: {
        marginRight: 'auto',
        fontSize: 16,
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
    imageAction: {
        borderRadius: 15,
        marginLeft: 5,
        marginTop: 5,
        width: 30,
        height: 30,
    },
    boxImageActionLeft: {
        position: 'absolute',
        top: 76,
        backgroundColor: '#00BB99',
        borderRadius: 20,
        width: 40,
        height: 40,
    },
    boxImageActionRight: {
        position: 'absolute',
        top: 76,
        right: 0,
        backgroundColor: '#FF0000',
        borderRadius: 20,
        width: 40,
        height: 40,
    },
    inputPicker: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 120,
        margin: 8,
        borderWidth: 1,
        color: "black",
        fontSize: 16
    }
});
