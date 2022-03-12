import React, { Component } from 'react';

import {
    StyleSheet,
    TextInput,
    Text,
    View,
    ScrollView,
    CheckBox,
    Image,
    FlatList,
    TouchableOpacity,
    Button
} from 'react-native';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {Picker} from '@react-native-picker/picker';

import RequestService from '../services/RequestService';

const radio_props = [
    {label: 'Cachorro', value: 0 },
    {label: 'Gato', value: 1 }
];
export default class CreateAnimal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            willFocusSubscription: null,
            age: '',
            name: '',
            description: '',
            type: 0,
            sex: '',
            base64Image: ''
        };
    }

    componentDidMount() {
        RequestService.validateToken().then((isValid) => {if (!isValid) this.props.navigation.navigate('InstitutionManagement')});
        this.setState({
            willFocusSubscription: this.state.props.navigation.addListener(
                'focus',
                () => {
                    RequestService.validateToken().then((isValid) => {if (!isValid) this.props.navigation.navigate('InstitutionManagement')});
                }
            )
        })
    }

    componentWillUnmount() {
        this.state.willFocusSubscription();
    }

    launchLibrary = async() => {
        let options = {
            mediaType: 'photo',
            quality: 1,
            maxWidth: 800,
            maxHeight: 800,
            includeBase64: true,
        };
        const result = await launchImageLibrary(options);
        if(result?.assets[0]?.base64) {
            this.setState({base64Image: 'data:image/jpeg;base64,' + result?.assets[0]?.base64})
        }
    }

    createAnimal = async() => {
        let animal = {
            age: Number(this.state.age),
            animalImage: this.state.base64Image,
            description: this.state.description,
            name: this.state.name,
            sex: this.state.sex == "M" ? 1 : 2,
            type: Number(this.state.type + 1),
            institution: {
                id: 1
            },
        }

        /*
            login: maria@yahoo.com.br
            senha: farofaehbao
            token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJpYUB5YWhvby5jb20uYnIiLCJleHAiOjE2NDk1Njg3MjF9.
            rhLOMnm3JuWvIZ9bEpTXvkiUoOe6MBzwiivREtNerx-IbOZknD1bV6AUvcYGZF8uQgYgNxGEIqnKbIOU01Yg6g
        */

        RequestService.postAnimal(animal);
    }

    render() {
        return (
            <ScrollView style={styles.body}>
                <View style={styles.inputBox}>
                    <Text style={styles.descriptionTxt}>
                        Nome
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Meg"
                        placeholderTextColor="#808080" 
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                    />
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.descriptionTxt}>
                        Descrição
                    </Text>
                    <TextInput
                        style={styles.inputTextBox}
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Ex: O animal está doente"
                        placeholderTextColor="#808080" 
                        onChangeText={(description) => this.setState({description})}
                        value={this.state.description}
                    />
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.descriptionTxt}>
                        Tipo
                    </Text>
                    <RadioForm
                        formHorizontal={true}
                        animation={true}
                        initial={0}
                        >
                        {/* To create radio buttons, loop through your array of options */}
                        {
                            radio_props.map((obj, i) => (
                            <RadioButton labelHorizontal={true} key={i} >
                                {/*  You can set RadioButtonLabel before RadioButtonInput */}
                                <RadioButtonInput
                                    obj={obj}
                                    index={i}
                                    isSelected={this.state.type == i}
                                    onPress={(type) => {this.setState({type})}}
                                    buttonInnerColor={'#000'}
                                    buttonOuterColor={'#000'}
                                    buttonWrapStyle={{marginLeft: 10}}
                                />
                                <RadioButtonLabel
                                    obj={obj}
                                    index={i}
                                    labelHorizontal={true}
                                    labelStyle={{fontSize: 20, color: '#000'}}
                                    labelWrapStyle={{}}
                                />
                            </RadioButton>
                            ))
                        }  
                        </RadioForm>
                </View>
                <View style={styles.inputBoxInline}>
                    <Text style={styles.descriptionTxtInline}>
                        Idade
                    </Text>
                    <TextInput
                        style={styles.inputWide}
                        placeholder="Ex: 0"
                        placeholderTextColor="#808080" 
                        onChangeText={(age) => this.setState({age})}
                        value={this.state.age}
                    />
                    <Text style={styles.descriptionTxtInline}>
                        Sexo
                    </Text>
                    <View style={styles.inputPicker}>
                        <Picker
                            style={{ height: 10, width: 150, color: 'black'}}
                            onValueChange={(sex) => this.setState({sex})}
                            selectedValue={this.state.sex}
                            color="#000"
                            dropdownIconColor="#000"
                            dropdownIconRippleColor="#000"
                        >
                            <Picker.Item label="Macho" value="M" />
                            <Picker.Item label="Fêmea" value="F" />
                        </Picker>
                    </View>
                </View>
                <View style={styles.cardBox}>
                    <TouchableOpacity
                        onPress={() => this.launchLibrary()}
                    >  
                        <View style={styles.cardImageLine}>
                            <Text style={styles.cardSupTxt}>
                                Carregar Imagem
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={styles.cardBox}>
                    <TouchableOpacity
                        onPress={() => this.createAnimal()}
                    >  
                        <View style={styles.cardImageLine}>
                            <Text style={styles.cardSupTxt}>
                                Cadastrar
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
                    {
                        this.state.base64Image != '' ? (<Image
                            style={styles.roundImage}
                            source={{uri: this.state?.base64Image}}
                        />) : null
                    }
            </ScrollView>
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
    cardImageLine: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    cardSupTxt: {
        width: "100%",
        marginRight: 'auto',
        fontSize: 24,
        textAlign: "center",
        color: "black"
    },
    inputBox: {
        padding: 5,
        marginRight: 16,
        marginLeft: 16,
        marginTop: 6
    },
    roundImage: {
        marginRight: 'auto',
        marginLeft: 'auto',
        width: 300,
        height: 300,
    },
    inputBoxInline: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 5,
        marginRight: 16,
        marginLeft: 16,
        marginTop: 6
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
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
        height: 60,
        width: 150,
        marginRight: 8,
        borderWidth: 1,
        color: "black",
        fontSize: 16
    },
    inputTextBox: {
        height: 95,
        textAlignVertical: 'top',
        borderWidth: 1,
        padding: 10,
        color: "black",
        fontSize: 16
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
