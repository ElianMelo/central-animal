import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';

import RequestService from '../services/RequestService';
import MessageUtils from '../utils/MessageUtils';

import Footer from './Footer';

const DATA = [
    {
        "id": 1,
        "name": "SOS Vida e Resgate",
        "city": "Uberlândia",
        "district": "Santa Mônica",
        "publicPlace": "Rua",
        "publicPlaceName": "Alvira",
        "institutionNumber": "225",
        "institutionImage": "imagem.png"
    }
];

export default class Institutions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            modalVisible: false,
            institutions: []
        };
    }

    componentDidMount() {
        this.loadInstitutions();
    }

    loadInstitutions = async() => {
        this.setState({institutions: await RequestService.getInstitutions()})
    }

    modalCallback = () => {
        this.setState({modalVisible: !this.state.modalVisible});
        console.log("callback");
    }

    // institutionImage
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
                    source={{uri: item.institutionImage}}
                />
                <Text style={styles.titleTxt}>
                    {item.name}
                    {this.state.valor}
                </Text>
            </View>
            <Text style={styles.adressTxt}>{`${item.city}, ${item.district} ${item.publicPlace} ${item.publicPlaceName} ${item.institutionNumber}`}</Text>
        </TouchableOpacity>
    );

    render() {
        return (
            <View style={styles.body}>
                <MessageUtils
                    topMessage={'500'}
                    message={'Animal não encontrado'}
                    callback={this.modalCallback}
                    modalVisible={this.state.modalVisible}
                />
                <TouchableOpacity 
                    style={styles.cardBox}
                    onPress={() =>
                        this.setState({modalVisible: !this.state.modalVisible})
                    }
                >
                    <View style={styles.cardImageLine}>
                        <Text style={styles.titleTxt}>
                            Modal
                        </Text>
                    </View>
                </TouchableOpacity>
                <FlatList
                    data={this.state.institutions}
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
        height: "100%",
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
