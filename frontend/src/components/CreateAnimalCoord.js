import React, { Component } from 'react';

import {
    StyleSheet,
    TextInput,
    Text,
    View,
    ScrollView,
    Image,
    TouchableOpacity,
} from 'react-native';

import Footer from './Footer';

import RequestService from '../services/RequestService';

import { launchCamera } from 'react-native-image-picker';
import { Picker } from '@react-native-picker/picker';

import MessageUtils from '../utils/MessageUtils';

import Geolocation from '@react-native-community/geolocation';

export default class CreateAnimalCoord extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            age: '',
            name: '',
            description: '',
            type: 0,
            sex: '',
            image: '',
            modalVisible: false,
            modalText: "Animal criado com sucesso",
            isSuccess: true
        };
    }

    launchLibrary = async () => {
        let options = {
            mediaType: 'photo',
            quality: 1,
            maxWidth: 800,
            maxHeight: 800,
            includeBase64: true,
        };
        const result = await launchCamera(options);
        if (result?.assets[0]?.base64) {
            this.setState({ image: 'data:image/jpeg;base64,' + result?.assets[0]?.base64 })
        }
    }

    createAnimal = async () => {
        try {
            Geolocation.getCurrentPosition(async (info) => {
                let animal = {
                    age: null,
                    image: this.state.image,
                    description: this.state.description,
                    name: null,
                    sex: null,
                    type: Number(this.state.type) + 1,
                    institution: null,
                    animalCoordinate: {
                        latitude: info.coords.longitude,
                        longitude: info.coords.latitude
                    }, 
                }
    
                await RequestService.postAnimal(animal);
            });
        } catch {
            this.setState({modalText: "Falha ao criar animal"});
            this.setState({isSuccess: false});
        }

        this.setState({modalVisible: !this.state.modalVisible});
    }

    modalCallback = () => {
        this.setState({modalVisible: !this.state.modalVisible});
        this.setState({image: ''});
        this.setState({description: ''});
        this.setState({type: ''});
    }

    render() {
        return (
            <>
                <>
                <ScrollView style={styles.body}>
                    <View style={[styles.inputBox, { marginTop: 30 }]}>
                        <Text style={styles.sessionDescriptionTxt}>
                            Adicionar Animal
                        </Text>
                        <Text style={styles.sessionDescriptionLowerTxt}>
                            Insira na descrição abaixo a situação do animal, se está saudável, doente, etc.
                        </Text>
                        <TextInput
                            style={styles.inputTextBox}
                            multiline={true}
                            numberOfLines={4}
                            placeholder="Descrição"
                            placeholderTextColor="#808080"
                            onChangeText={(description) => this.setState({ description })}
                            value={this.state.description}
                        />
                    </View>
                    <View style={styles.inputBox}>
                        <View style={styles.inputPicker}>
                            <Picker
                                style={styles.pickerStyle}
                                onValueChange={(type) => this.setState({ type })}
                                selectedValue={this.state.type}
                                mode="dropdown"
                                color="#000"
                                dropdownIconColor="#000"
                                dropdownIconRippleColor="#000"
                            >
                                <Picker.Item label="Tipo" enabled={false} />
                                <Picker.Item label="Cachorro" value="0" />
                                <Picker.Item label="Gato" value="1" />
                            </Picker>
                        </View>
                    </View>
                    <View style={styles.inputBox}>
                        <Text style={styles.sessionDescriptionTxt}>
                            Foto do Animal
                        </Text>
                        <Text style={styles.sessionDescriptionLowerTxt}>
                            Insira a foto do animal na região a baixo.
                        </Text>
                    </View>
                    <View style={styles.inputBox}>
                        <View style={styles.cardBox}>
                            <TouchableOpacity
                                style={{ height: 215}}
                                onPress={() => this.launchLibrary()}
                            >  
                                {
                                    this.state?.image ? 
                                    (
                                        <View style={styles.inputBoxRow}>
                                            <Image
                                                style={styles.roundImage}
                                                source={{uri: this.state?.image}}
                                            />
                                        </View> 
                                    ) : 
                                    null
                                }
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.cardBox, {marginBottom: 60, marginTop: 20}]}>
                        <TouchableOpacity
                            onPress={() => this.createAnimal()}
                        >
                            <View style={styles.cardImageLine}>
                                <Text style={styles.cardSupTxt}>
                                    Adicionar
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <MessageUtils
                        isSuccess={this.state.isSuccess}
                        message={this.state.modalText}
                        callback={this.modalCallback}
                        modalVisible={this.state.modalVisible}
                    />
                </ScrollView>
                </>
                <Footer navigation={this.state.props.navigation}/>
            </> 
        );
    }
}

const styles = StyleSheet.create({
    body: {
        height: "100%",
        marginBottom: 50
    },
    cardBox: {
        textAlign: "center",
        marginHorizontal: 14,
        marginVertical: 6,
        padding: 12,
        borderRadius: 14,
        backgroundColor: "#00C2CB",
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
    inputBoxRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 5,
        marginRight: 16,
        marginLeft: 16,
        marginTop: 1
    },
    cardImageLine: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardSupTxt: {
        width: "100%",
        marginRight: 'auto',
        fontSize: 22,
        textAlign: "center",
        color: "white"
    },
    inputBox: {
        padding: 5,
        marginRight: 16,
        marginLeft: 16,
        marginTop: 6
    },
    roundImage: {
        width: 285,
        height: 200,
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    inputBoxInline: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginRight: 16,
        marginLeft: 16,
        marginTop: 6
    },
    input: {
        height: 50,
        borderWidth: 3,
        borderRadius: 10,
        padding: 10,
        paddingLeft: 22,
        color: "black",
        fontSize: 16
    },
    inputTextBox: {
        height: 120,
        textAlignVertical: 'top',
        borderWidth: 3,
        borderRadius: 10,
        padding: 10,
        paddingLeft: 22,
        color: "black",
        fontSize: 16
    },
    inputWide: {
        height: 60,
        width: 80,
        marginRight: 8,
        borderWidth: 1,
        padding: 10,
        color: "black",
        fontSize: 16
    },
    inputPicker: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        width: "100%",
        color: "black",
        fontSize: 16,
        borderWidth: 3,
        borderRadius: 10,
        padding: 10,
        paddingLeft: 22,
        color: "black",
        fontSize: 16
    },
    pickerStyle: {
        marginLeft: 16,
        height: 5,
        width: "100%",
        color: 'black',
        borderWidth: 1
    },
    descriptionTxt: {
        marginRight: 'auto',
        fontSize: 14,
        marginBottom: 8,
        textAlign: "center",
        color: "black",
        fontSize: 20
    },
    descriptionTxtInline: {
        fontSize: 14,
        marginBottom: 8,
        marginRight: 8,
        textAlign: "center",
        color: "black",
        fontSize: 20
    },
});
