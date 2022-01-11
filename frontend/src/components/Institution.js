import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList
} from 'react-native';

import Footer from './Footer';

const image = require('../../assets/predio1.jpg');
const map = require('../../assets/map.png');
const whats = require('../../assets/whats.png');
const pix = require('../../assets/pix.png');

const DATA = [
    {
        id: '1',
        txt: 'Ração',
    },
    {
        id: '2',
        txt: 'Medicamentos',
    },
    {
        id: '3',
        txt: 'Material Limpeza',
    },
];
export default class Institution extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            titleText: "Instituição",
        };
    }

    renderItem = ({ item }) => (
        <Text style={styles.cardTxt}>
            {'\u2022' + " " + item.txt}
        </Text>
    );

    render() {
        return (
            <View style={styles.body}>
                <View style={styles.headerLine}>
                    <Image
                        style={styles.roundImage}
                        source={image}
                    />
                    <View style={styles.headerColumn}>
                        <Text style={styles.titleTxt}>
                            S.O.S Vida e Resgaste
                        </Text>
                        <Text style={styles.descriptionTxt}>
                            Somos uma instituição de resgate de cachorros e gatos em situação de rua, realizamos o tratamento e também realizamos adoção destes animais, nosso objetivo é salvar o maior número possível de animais
                        </Text>
                    </View>
                </View>
                <View style={styles.cardBox}>
                    <View style={styles.cardImageLine}>
                        <Image
                            style={styles.cardImage}
                            source={map}
                        />
                        <Text style={styles.cardTxt}>
                            Uberlândia, Santa Mônica
                        </Text>
                    </View>
                </View>
                <View style={styles.cardBox}>
                    <View style={styles.cardImageLine}>
                        <Image
                            style={styles.cardImage}
                            source={whats}
                        />
                        <Text style={styles.cardTxt}>
                            (34) 9 1234-5678
                        </Text>
                    </View>
                </View>
                <View style={styles.cardBox}>
                    <View style={styles.cardImageLine}>
                        <Image
                            style={styles.cardImage}
                            source={pix}
                        />
                        <Text style={styles.cardTxt}>
                            sosvidaresgate@gmail.com
                        </Text>
                    </View>
                </View>

                <View style={styles.animalBox}>
                    <View style={styles.cardImageLine}>
                        <Text style={styles.cardTxt}>
                            Animais
                        </Text>
                    </View>
                </View>

                <View style={styles.needBox}>
                    <View style={styles.needColumn}>
                        <Text style={styles.cardTxt}>
                            Precisamos
                        </Text>
                        <FlatList
                            data={DATA}
                            style={styles.topMargin}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
                <Footer />
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
