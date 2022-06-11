import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    Linking,
    ScrollView,
} from 'react-native';

import Clipboard from '@react-native-clipboard/clipboard';

import Footer from './Footer';

const doggie = require('../../assets/doggie.png');
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

    render() {
        return (
            <>
                <ScrollView style={styles.body}>
                    <View style={styles.headerLine}>
                        <Image
                            style={styles.roundImage}
                            source={{uri: this.state.institution?.image}}
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
                        onPress={() =>
                            this.props.navigation.navigate('Animals', {
                                institutionId: this.props.route.params.institutionId
                            })
                        }
                    >
                        <View style={[styles.animalBox, styles.cardImageLine]}>
                            <View style={styles.lineItemText}>
                                <Text style={styles.cardAnimalSupTxt}>
                                Pets em adoção
                                </Text>
                            </View>
                            <View style={styles.cardColor}>
                            <Image
                                    style={styles.cardImage}
                                    source={doggie}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => this.openMaps()}
                    >
                        <View style={[styles.cardBox, styles.cardImageLine]}>
                            <View style={styles.lineItemText}>
                                <Text style={styles.cardSupTxt}>
                                    {`${this.state.institution?.address?.city}, ${this.state.institution?.address?.district} ${this.state.institution?.address?.publicPlace} ${this.state.institution?.address?.publicPlaceName} ${this.state.institution?.address?.number}`}
                                </Text>
                            </View>
                            <View style={styles.cardColor}>
                                <Image
                                    style={[styles.cardImage, {width: 50, height: 50}]}
                                    source={map}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => this.openWhatsapp()}
                    >
                        <View style={[styles.cardBox, styles.cardImageLine]}>
                            <View style={styles.lineItemText}>
                            <Text style={styles.cardSupTxt}>
                                    {this.state.institution?.whatsapp}
                                </Text>
                            </View>
                            <View style={styles.cardColor}>
                                <Image
                                    style={styles.cardImage}
                                    source={whats}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity 
                        onPress={() => this.openPix()}
                    >
                        <View style={[styles.cardBox, styles.cardImageLine]}>
                            <View style={styles.lineItemText}>
                                <Text style={styles.cardSupTxt}>
                                    {this.state.institution?.pix}
                                </Text>
                            </View>
                            <View style={styles.cardColor}>
                                <Image
                                    style={styles.cardImage}
                                    source={pix}
                                />
                            </View>
                        </View>
                    </TouchableOpacity>

                    <View style={styles.needBox}>
                        <View style={styles.needRow}>
                            <View style={styles.needTxtBox}>
                                <Text style={styles.needTxt}>
                                    Precisamos
                                </Text>
                            </View>
                            <View style={styles.needsTxt}>
                            { this.state.needs ? (
                                this.state.needs.map((item) => {
                                    return (
                                        <Text style={styles.cardTxt} key={item.id}>
                                            {'-' + " " + item.txt }
                                        </Text>
                                    )
                                })
                            ) : null} 
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <Footer navigation={this.state.props.navigation}/>
            </>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        paddingTop: 30,
        marginBottom: 70,

        height: "100%",
        backgroundColor: "white"
    },
    cardColorAnimal: {
        marginLeft: "auto",
        width: "30%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "101%",
        backgroundColor: "#00C2CB"
    },
    cardColor: {
        marginLeft: "auto",
        width: "20%",
        padding: 16,
        borderBottomRightRadius: 12,
        borderTopRightRadius: 12,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "#00C2CB"
    },
    lineItemText: {
        padding: 18,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "80%"
    },
    cardBox: {
        height: 80,
        textAlign: "center",
        marginHorizontal: 14,
        marginVertical: 6,
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
    cardBoxAnimal: {
        borderColor: '#00C2CB', 
        borderWidth: 4,
    },
    animalBox: {
        height: 80,
        textAlign: "center",
        marginHorizontal: 14,
        marginVertical: 6,
        borderRadius: 14,
        backgroundColor: "white",        
        shadowColor: "#F76E11",
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
        borderRadius: 14,
        backgroundColor: "white",        
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        marginBottom: 40,
    },
    headerLine: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: "100%"
    },
    headerColumn: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        width: "60%"
    },
    needRow: {
        display: 'flex',
        flexDirection: 'row',
    },
    topMargin: {
        marginTop: 10
    },
    roundImage: {
        marginRight: 'auto',
        marginLeft: 14,
        width: 120,
        height: 120,
        borderRadius: 12
    },
    cardImageLine: {
        display: 'flex',
        margin: 'auto',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardImage: {
        margin: 'auto',
        width: 40,
        height: 40,
    },
    titleTxt: {
        fontSize: 24,
        marginTop: 6,
        fontWeight: "bold",
        color: "black"
    },
    descriptionTxt: {
        fontSize: 14,
        marginTop: 6,
        color: "black"
    },
    cardSupTxt: {
        margin: "auto",
        fontSize: 16,
        textAlign: "center",
        color: "black"
    },
    cardAnimalSupTxt: {
        margin: "auto",
        fontSize: 24,
        textAlign: "center",
        fontWeight: "bold",
        color: "#F76E11"
    },
    cardTxt: {
        marginRight: 'auto',
        fontSize: 16,
        fontWeight: '500',
        textAlign: "center",
        color: "black"
    },
    needTxtBox: {
        padding: 20,
        width: "50%",
        height: "100%",
        backgroundColor: "#F76E11",
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 12,
        borderTopLeftRadius: 12,
    },
    needTxt: {
        margin: 'auto',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: "center",
        color: "white"
    },
    needsTxt: {
        width: "50%",
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
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
