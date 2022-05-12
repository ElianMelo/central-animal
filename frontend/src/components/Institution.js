import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    Linking
} from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';

import Footer from './Footer';

const map = require('../../assets/map.png');
const whats = require('../../assets/whats.png');
const pix = require('../../assets/pix.png');

import RequestService from '../services/RequestService';
export default class Institution extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            titleText: "Instituição",
            institution: {},
            needs: []
        };
    }

    componentDidMount() {
        this.loadInstitution();
    }

    loadInstitution = async() => {
        let institution = await RequestService.getInstitution(this.props.route.params.institutionId)
        this.setState({institution})
        this.defineNeeds();
    }

    defineNeeds = () => {
        let needs = [];
        if(this.state.institution?.portion) {
            needs.push({ id: '1', txt: 'Ração' });
        }
        if(this.state.institution?.medicines) {
            needs.push({ id: '2', txt: 'Medicamentos' });
        }
        if(this.state.institution?.cleaningMaterial) {
            needs.push({ id: '3', txt: 'Material Limpeza' });
        }
        this.setState({needs});
    }

    openWhatsapp = () => {
        Linking.openURL('whatsapp://send?text=' + "Olá, vim do aplicativo central animal, tenho interesse em saber mais sobre" + '&phone=' + this.state.institution?.whatsapp);
    }

    openMaps = () => {
        Linking.openURL("geo:?q=" + 
            `${this.state.institution?.address?.city}, ${this.state.institution?.address?.district} ${this.state.institution?.address?.publicPlace} ${this.state.institution?.address?.publicPlaceName} ${this.state.institution?.address?.number}`
        );
    }

    openPix = () => {
        Clipboard.setString(this.state.institution?.pix);
    }

    renderItem = ({ item }) => (
        <Text style={styles.cardTxt}>
            {'\u2022' + " " + item.txt }
        </Text>
    );

    render() {
        return (
            <View style={styles.body}>
                <View style={styles.headerLine}>
                    <Image
                        style={styles.roundImage}
                        source={{uri: this.state.institution?.institutionImage}}
                    />
                    <View style={styles.headerColumn}>
                        <Text style={styles.titleTxt}>
                            {this.state.institution?.name}
                        </Text>
                        <Text style={styles.descriptionTxt}>
                            {this.state.institution?.description}
                        </Text>
                    </View>
                </View>

                <TouchableOpacity 
                    onPress={() => this.openMaps()}
                >
                    <View style={styles.cardBox}>
                        <View style={styles.cardImageLine}>
                            <Image
                                style={styles.cardImage}
                                source={map}
                            />
                            <Text style={styles.cardSupTxt}>
                                {`${this.state.institution?.address?.city}, ${this.state.institution?.address?.district} ${this.state.institution?.address?.publicPlace} ${this.state.institution?.address?.publicPlaceName} ${this.state.institution?.address?.number}`}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => this.openWhatsapp()}
                >
                    <View style={styles.cardBox}>
                        <View style={styles.cardImageLine}>
                            <Image
                                style={styles.cardImage}
                                source={whats}
                            />
                            <Text style={styles.cardSupTxt}>
                                {this.state.institution?.whatsapp}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    onPress={() => this.openPix()}
                >
                    <View style={styles.cardBox}>
                        <View style={styles.cardImageLine}>
                            <Image
                                style={styles.cardImage}
                                source={pix}
                            />
                            <Text style={styles.cardSupTxt}>
                                {this.state.institution?.pix}
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={styles.animalBox}
                    onPress={() =>
                        this.props.navigation.navigate('Animals', {
                            institutionId: this.props.route.params.institutionId
                        })
                    }
                >
                    <View style={styles.cardImageLine}>
                        <Text style={styles.cardTxt}>
                            Animais
                        </Text>
                    </View>
                </TouchableOpacity>

                <View style={styles.needBox}>
                    <View style={styles.needColumn}>
                        <Text style={styles.cardTxt}>
                            Precisamos
                        </Text>
                        <FlatList
                            data={this.state.needs}
                            style={styles.topMargin}
                            renderItem={this.renderItem}
                            keyExtractor={item => item.id}
                        />
                    </View>
                </View>
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
        width: "80%",
        marginRight: 'auto',
        fontSize: 16,
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
