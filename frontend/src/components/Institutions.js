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

import Footer from './Footer';
export default class Institutions extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            willFocusSubscription: null,
            modalVisible: false,
            institutions: []
        };
    }

    componentDidMount() {
        this.setState({
            willFocusSubscription: this.state.props.navigation.addListener(
                'focus',
                () => {
                    this.loadInstitutions();
                }
            )
        })
        this.loadInstitutions(); 
    }

    componentWillUnmount() {
        this.state.willFocusSubscription();
    }

    loadInstitutions = async() => {
        let institutions = await RequestService.getInstitutions();
        this.setState({institutions})
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
                    source={{uri: item.image}}
                />
                <View style={styles.cardImageCol}>
                    <Text style={styles.titleTxt}>
                        {item.name}
                        {this.state.valor}
                    </Text>
                    <Text style={styles.addressTxt}>{`${item.city}, ${item.district} ${item.publicPlace} ${item.publicPlaceName} ${item.institutionNumber}`}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    render() {
        return (
            <View style={styles.body}>
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
        paddingTop: 30,
        height: "100%",
        backgroundColor: "white"
    },
    bottomMargin: {
        marginBottom: 70
    },
    cardBox: {
        textAlign: "center",
        marginHorizontal: 16,
        marginVertical: 10,
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
    cardImageCol: {
        width: "70%",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
    },
    titleTxt: {
        marginRight: 'auto',
        fontSize: 20,
        marginBottom: 8,
        fontWeight: "bold",
        textAlign: "center",
        color: "black"
    },
    addressTxt: {
        fontSize: 16,
        color: "black"
    },
    roundCardImage: {
        marginRight: 'auto',
        width: 100,
        height: 130,
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16,
    },
});
