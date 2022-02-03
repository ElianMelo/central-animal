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

import Footer from './Footer';

const map = require('../../assets/map.png');
const whats = require('../../assets/whats.png');
const pix = require('../../assets/pix.png');

export default class InstitutionManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
        };
    }

    render() {
        return (
            <View style={styles.body}>
                <View style={{marginTop: 'auto', marginBottom: 'auto'}}>
                    <View style={styles.cardBox}>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('ChangeInstitution')
                            }
                        >
                            <View style={styles.cardImageLine}>
                                <Text style={styles.cardSupTxt}>
                                    Atualizar dados de instituição
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardBox}>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('CreateAnimal')
                            }
                        >
                            <View style={styles.cardImageLine}>
                                <Text style={styles.cardSupTxt}>
                                    Cadastrar novo animal
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardBox}>
                        <TouchableOpacity
                            onPress={() =>
                                this.props.navigation.navigate('ChangeAnimal')
                            }
                        >
                            <View style={styles.cardImageLine}>
                                <Text style={styles.cardSupTxt}>
                                    Alterar animal
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.cardBox}>
                        <TouchableOpacity>  
                            <View style={styles.cardImageLine}>
                                <Text style={styles.cardSupTxt}>
                                    Deslogar
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Footer navigation={this.state.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        height: "100%"
    },
    cardBox: {
        textAlign: "center",
        marginHorizontal: 14,
        marginVertical: 6,
        padding: 12,
        borderRadius: 14,
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
    animalBox: {
        textAlign: "center",
        marginHorizontal: 14,
        marginVertical: 6,
        padding: 20,
        borderRadius: 14,
        backgroundColor: "orange",        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    needBox: {
        textAlign: "center",
        marginHorizontal: 14,
        marginVertical: 6,
        padding: 20,
        borderRadius: 14,
        backgroundColor: "yellow",        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    headerLine: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%"
    },
    headerColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: "70%"
    },
    needColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    topMargin: {
        marginTop: 10
    },
    roundImage: {
        marginRight: 'auto',
        width: 120,
        height: 120,
        borderRadius: 60
    },
    cardImageLine: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardImage: {
        marginRight: 'auto',
        width: 35,
        height: 35,
    },
    titleTxt: {
        marginRight: 'auto',
        fontSize: 24,
        margin: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "black"
    },
    descriptionTxt: {
        marginRight: 'auto',
        fontSize: 14,
        textAlign: "center",
        color: "black"
    },
    cardSupTxt: {
        width: "100%",
        marginRight: 'auto',
        fontSize: 24,
        textAlign: "center",
        color: "black"
    },
    cardTxt: {
        marginRight: 'auto',
        fontSize: 16,
        textAlign: "center",
        color: "black"
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
});
