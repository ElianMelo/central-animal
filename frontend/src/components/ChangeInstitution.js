import React, { Component } from 'react';

import {
    StyleSheet,
    ScrollView,
    Text,
    View,
    TextInput,
    Switch,
    Image,
    FlatList,
    TouchableOpacity,
    Pressable,
    Modal,
    Button
} from 'react-native';

import RequestService from '../services/RequestService';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
export default class ChangeInstitution extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            willFocusSubscription: null,
            institution: {},
            modalVisible: false,
            name: '',
            description: '',
            city: '',
            district: '',
            publicPlace: '',
            number: '',
            whatsapp: '',
            pix: '',
            portion: true,
            medicines: true,
            cleaningMaterial: true,
            base64Image: '',
            institutionImage: ''
        };
    }

    loadInstitution = async() => {
        let institution = await RequestService.getInstitution(this.props.route.params.institutionId);
        this.setState({institution});

        this.setState({name: institution.name});
        this.setState({description: institution.description});
        this.setState({city: institution.address.city});
        this.setState({district: institution.address.district});
        this.setState({publicPlace: institution.address.publicPlace});
        this.setState({publicPlaceName: institution.address.publicPlaceName});
        this.setState({number: institution.address.number});
        this.setState({whatsapp: institution.whatsapp});
        this.setState({pix: institution.pix});
        this.setState({portion: institution.portion});
        this.setState({medicines: institution.medicines});
        this.setState({cleaningMaterial: institution.cleaningMaterial});
        this.setState({institutionImage: institution.institutionImage});
    }

    updateInstitution = async() => {
        let institution = this.state.institution;

        institution.name = this.state.name;
        institution.description = this.state.description;
        institution.address.city = this.state.city;
        institution.address.district = this.state.district;
        institution.address.publicPlace = this.state.publicPlace;
        institution.address.publicPlaceName = this.state.publicPlaceName;
        institution.address.number = this.state.number;
        institution.whatsapp = this.state.whatsapp;
        institution.pix = this.state.pix;
        institution.portion = this.state.portion;
        institution.medicines = this.state.medicines;
        institution.cleaningMaterial = this.state.cleaningMaterial;
        institution.institutionImage = this.state.base64Image;

        await RequestService.putInstitution(this.props.route.params.institutionId, institution);
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
        this.loadInstitution();
    }

    componentWillUnmount() {
        this.state.willFocusSubscription();
    }

    saveInstitution = async() => {
        await this.updateInstitution();
        this.setState({modalVisible: true});
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

    render() {
        return (
            <ScrollView style={styles.body}>
                <View style={styles.inputBox}>
                    <Text style={styles.sessionDescriptionTxt}>
                        Dados da Instituição
                    </Text>
                    <Text style={styles.descriptionTxt}>
                        Nome
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: SOS Vida e Resgate"
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
                        placeholder="Ex: Instituição de caridade para ajudar animais de rua."
                        placeholderTextColor="#808080" 
                        onChangeText={(description) => this.setState({description})}
                        value={this.state.description}
                    />
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.descriptionTxt}>
                        Whatsapp
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: (34) 9 9999-9999"
                        placeholderTextColor="#808080" 
                        onChangeText={(whatsapp) => this.setState({whatsapp})}
                        value={this.state.whatsapp}
                    />
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.descriptionTxt}>
                        Pix
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: (34) 9 9999-9999"
                        placeholderTextColor="#808080" 
                        onChangeText={(pix) => this.setState({pix})}
                        value={this.state.pix}
                    />
                </View>
                <View style={styles.inputBoxRow}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#6aa84f" }}
                        thumbColor={this.state.portion ? "#8fce00" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(portion) => this.setState({portion})}
                        value={this.state.portion}
                    />
                    <Text style={styles.descriptionSwitchTxt}>
                        Alimentos
                    </Text>
                </View>
                <View style={styles.inputBoxRow}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#6aa84f" }}
                        thumbColor={this.state.medicines ? "#8fce00" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(medicines) => this.setState({medicines})}
                        value={this.state.medicines}
                    />
                    <Text style={styles.descriptionSwitchTxt}>
                        Medicamentos
                    </Text>
                </View>
                <View style={styles.inputBoxRow}>
                    <Switch
                        trackColor={{ false: "#767577", true: "#6aa84f" }}
                        thumbColor={this.state.cleaningMaterial ? "#8fce00" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(cleaningMaterial) => this.setState({cleaningMaterial})}
                        value={this.state.cleaningMaterial}
                    />
                    <Text style={styles.descriptionSwitchTxt}>
                        Material de Limpeza
                    </Text>
                </View>
                <View style={styles.inputBox}>
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
                </View>
                <View style={styles.inputBoxRow}>
                    <Image
                        style={styles.roundImage}
                        source={{uri: this.state.institution?.institutionImage}}
                    />
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.sessionDescriptionTxt}>
                        Localização da Instituição
                    </Text>
                    <Text style={styles.descriptionTxt}>
                        Cidade
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Uberlândia"
                        placeholderTextColor="#808080" 
                        onChangeText={(city) => this.setState({city})}
                        value={this.state.city}
                    />
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.descriptionTxt}>
                        Bairro
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Santa Mônica"
                        placeholderTextColor="#808080" 
                        onChangeText={(district) => this.setState({district})}
                        value={this.state.district}
                    />
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.descriptionTxt}>
                        Logradouro
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Rua"
                        placeholderTextColor="#808080" 
                        onChangeText={(publicPlace) => this.setState({publicPlace})}
                        value={this.state.publicPlace}
                    />
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.descriptionTxt}>
                        Nome do Logradouro
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: Alvira"
                        placeholderTextColor="#808080" 
                        onChangeText={(publicPlaceName) => this.setState({publicPlaceName})}
                        value={this.state.publicPlaceName}
                    />
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.descriptionTxt}>
                        Número
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ex: 225"
                        placeholderTextColor="#808080" 
                        onChangeText={(number) => this.setState({number})}
                        value={this.state.number}
                    />
                </View>
                <View style={styles.inputBox}>
                    <View style={styles.cardBox}>
                        <TouchableOpacity
                            onPress={() => this.saveInstitution()}
                        >  
                            <View style={styles.cardImageLine}>
                                <Text style={styles.cardSupTxt}>
                                    Salvar Instituição
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        this.setState({modalVisible: false});
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <Text style={styles.modalText}>Instituição salva com sucesso!</Text>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => this.setState({modalVisible: false})}
                        >
                            <Text style={styles.textStyle}>Fechar</Text>
                        </Pressable>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        height: "100%"
    },
    roundImage: {
        width: 200,
        height: 200,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        color: "black",
        marginBottom: 15,
        textAlign: "center"
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
    inputBoxRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 5,
        marginRight: 16,
        marginLeft: 16,
        marginTop: 6
    },
    descriptionTxt: {
        marginRight: 'auto',
        fontSize: 14,
        marginBottom: 8,
        textAlign: "center",
        color: "black",
        fontSize: 20
    },
    descriptionSwitchTxt: {
        fontSize: 14,
        marginBottom: 4,
        marginLeft: 8,
        textAlign: "center",
        color: "black",
        fontSize: 20
    },
    sessionDescriptionTxt: {
        marginBottom: 10,
        textAlign: "center",
        color: "black",
        fontSize: 22
    },
    input: {
        height: 40,
        borderWidth: 1,
        padding: 10,
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
});
