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
export default class ChangeAnimal extends Component {

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
        this.loadAnimal(this.props.route.params.id);
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

    loadAnimal = async(id) => {
        let animal = await RequestService.getAnimal(id);
        this.setState({animal});

        this.setState({age: animal.age.toString()});
        this.setState({name: animal.name});
        this.setState({description: animal.description});
        this.setState({type: (animal.type - 1).toString()});
        setTimeout(() => {
            this.setState({sex: animal.sex == 1 ? "M" : "F"});
        }, 100);
        this.setState({base64Image: animal.animalImage});
    }

    updateAnimal = async() => {
        let animal = {
            age: Number(this.state.age),
            animalImage: this.state.base64Image,
            description: this.state.description,
            name: this.state.name,
            sex: this.state.sex == "M" ? 1 : 2,
            type: Number(Number(this.state.type) + 1),
            institution: {
                id: this.props.route.params.institutionId
            }
        }

        /*
            login: maria@yahoo.com.br
            senha: farofaehbao
            token: eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJtYXJpYUB5YWhvby5jb20uYnIiLCJleHAiOjE2NDk1Njg3MjF9.
            rhLOMnm3JuWvIZ9bEpTXvkiUoOe6MBzwiivREtNerx-IbOZknD1bV6AUvcYGZF8uQgYgNxGEIqnKbIOU01Yg6g
        */

        await RequestService.putAnimal(this.props.route.params.id, animal);
        await this.props.navigation.navigate("AnimalsEdit", {institutionId: this.props.route.params.institutionId});
    }

    render() {
        return (
            <ScrollView style={styles.body}>
                <View style={[styles.inputBox, { marginTop: 30 }]}>
                    <Text style={styles.sessionDescriptionTxt}>
                        Alterar Animal
                    </Text>
                    <Text style={styles.sessionDescriptionLowerTxt}>
                        Altere os dados do animal nos campos abaixo.
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome do animal"
                        placeholderTextColor="#808080"
                        onChangeText={(name) => this.setState({ name })}
                        value={this.state.name}
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.inputTextBox}
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Descrição"
                        placeholderTextColor="#808080" 
                        onChangeText={(description) => this.setState({description})}
                        value={this.state.description}
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Idade"
                        placeholderTextColor="#808080"
                        onChangeText={(age) => this.setState({ age })}
                        value={this.state.age}
                    />
                </View>
                <View style={styles.inputBoxInline}>
                    <View style={styles.inputPicker}>
                        <Picker
                            style={styles.pickerStyle}
                            onValueChange={(sex) => this.setState({ sex })}
                            selectedValue={this.state.sex}
                            mode="dropdown"
                            color="#000"
                            dropdownIconColor="#000"
                            dropdownIconRippleColor="#000"
                        >
                            <Picker.Item label="Sexo" enabled={false} />
                            <Picker.Item label="Macho" value="M" />
                            <Picker.Item label="Fêmea" value="F" />
                        </Picker>
                    </View>
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
                    <View style={styles.cardBox}>
                        <TouchableOpacity
                            style={{ height: 215}}
                            onPress={() => this.launchLibrary()}
                        >  
                            {
                                this.state?.base64Image ? 
                                (
                                    <View style={styles.inputBoxRow}>
                                        <Image
                                            style={styles.roundImage}
                                            source={{uri: this.state?.base64Image}}
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
                        onPress={() => this.updateAnimal()}
                    >
                        <View style={styles.cardImageLine}>
                            <Text style={styles.cardSupTxt}>
                            Salvar
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        height: "100%",
        backgroundColor: "white"
    },
    cardBox: {
        textAlign: "center",
        marginHorizontal: 14,
        marginVertical: 6,
        padding: 12,
        borderRadius: 14,
        backgroundColor: "#00C2CB",
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
        width: 166,
        margin: 8,
        borderWidth: 3,
        borderRadius: 10,
        color: "black",
        fontSize: 16
    },
    pickerStyle: {
        marginLeft: 16,
        height: 5,
        width: 166,
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
