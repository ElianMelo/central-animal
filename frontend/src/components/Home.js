import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';

import Footer from './Footer';

import RequestService from '../services/RequestService';

const refresh = require('../../assets/refresh.png');
export default class Home extends Component {

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

    redirectToInstitution = (institutionId) => {
        this.props.navigation.navigate('Institution', {
            institutionId
        })
    }

    renderItem = ({ item }) => (
        <TouchableOpacity 
            style={styles.cardBox}
            onPress={() => this.redirectToInstitution(item.institutionDTO.id)}
        >
            <Image
                style={styles.roundCardImage}
                source={{uri: item.image}}
            />
            <View style={styles.cardColumn}>
                <Text style={styles.nameTxt}>
                    {item.institutionDTO.name}
                </Text>
            </View>
        </TouchableOpacity>
    );

    render() {
        return (
            <View style={styles.body}>
                <View style={styles.inputBox}>
                    <View style={{width: "70%"}}>
                        <Text style={styles.sessionDescriptionTxt}>
                            Adoções para você
                        </Text>
                        <Text style={styles.sessionDescriptionLowerTxt}>
                            Esta são umas das sugestões de adoções para você.
                        </Text>
                    </View>
                    <View style={{width: "30%", marginBottom: 24}}>
                        <TouchableOpacity
                            onPress={() => this.loadAnimals()}
                        >
                            <Image
                                style={styles.iconImage}
                                source={refresh}
                            />
                        </TouchableOpacity>
                    </View>
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
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: "100%"
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
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
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
        alignSelf: 'flex-start',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        width: "100%",
        height: 200,
    },    
    iconImage: {
        margin: 'auto',
        width: 50,
        height: 50,
    },             
    cardColumn: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        margin: 'auto',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    nameTxt: {
        fontSize: 16,
        height: "100%",
        margin: 'auto',
        fontWeight: "bold",
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
