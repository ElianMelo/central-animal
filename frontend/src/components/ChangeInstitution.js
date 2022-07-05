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
import MessageUtils from '../utils/MessageUtils';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
export default class ChangeInstitution extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            willFocusSubscription: null,
            institution: {},
            name: '',
            description: '',
            city: '',
            district: '',
            publicPlace: '',
            number: '',
            whatsapp: '',
            instagram: '',
            pix: '',
            portion: true,
            medicines: true,
            cleaningMaterial: true,
            image: '',
            modalVisible: false,
            modalText: "Instituição alterada com sucesso",
            isSuccess: true
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
        this.setState({instagram: institution.instagram});
        this.setState({pix: institution.pix});
        this.setState({portion: institution.portion});
        this.setState({medicines: institution.medicines});
        this.setState({cleaningMaterial: institution.cleaningMaterial});
        this.setState({image: institution.image});
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
        institution.instagram = this.state.instagram;
        institution.pix = this.state.pix;
        institution.portion = this.state.portion;
        institution.medicines = this.state.medicines;
        institution.cleaningMaterial = this.state.cleaningMaterial;
        institution.image = this.state.image;
        institution.administrator = null;

        try {
            await RequestService.putInstitution(this.props.route.params.institutionId, institution);
        } catch {
            this.setState({modalText: "Falha ao alterar instituição"});
            this.setState({isSuccess: false});
        }
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
        this.setState({modalVisible: !this.state.modalVisible});
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
            this.setState({image: 'data:image/jpeg;base64,' + result?.assets[0]?.base64});
        }
    }

    modalCallback = () => {
        this.setState({modalVisible: !this.state.modalVisible});
        this.props.navigation.navigate("InstitutionManagement");
    }

    render() {
        return (
            <ScrollView style={styles.body}>
                <View style={[styles.inputBox, {marginTop: 30}]}>
                    <Text style={styles.sessionDescriptionTxt}>
                        Atualizar instituição
                    </Text>
                    <Text style={styles.sessionDescriptionLowerTxt}>
                        Insira as especificações da instituição nos campos a baixo.
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome"
                        placeholderTextColor="#000000" 
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.inputTextBox}
                        multiline={true}
                        numberOfLines={4}
                        placeholder="Descrição"
                        placeholderTextColor="#000000" 
                        onChangeText={(description) => this.setState({description})}
                        value={this.state.description}
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Whatsapp"
                        placeholderTextColor="#000000" 
                        onChangeText={(whatsapp) => this.setState({whatsapp})}
                        value={this.state.whatsapp}
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Instagram"
                        placeholderTextColor="#000000" 
                        onChangeText={(instagram) => this.setState({instagram})}
                        value={this.state.instagram}
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Chave Pix"
                        placeholderTextColor="#000000" 
                        onChangeText={(pix) => this.setState({pix})}
                        value={this.state.pix}
                    />
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.sessionDescriptionTxt}>
                        Necessidades
                    </Text>
                    <Text style={styles.sessionDescriptionLowerTxt}>
                        Marque as caixas dos recursos que a instituição aceita.
                    </Text>
                </View>
                <View style={styles.inputBoxRow}>
                    <Switch
                        trackColor={{ false: "#9e9e9e", true: "#00C2CB" }}
                        thumbColor={this.state.portion ? "#00C2CB" : "#00C2CB"}
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
                        trackColor={{ false: "#9e9e9e", true: "#00C2CB" }}
                        thumbColor={this.state.portion ? "#00C2CB" : "#00C2CB"}
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
                        trackColor={{ false: "#9e9e9e", true: "#00C2CB" }}
                        thumbColor={this.state.portion ? "#00C2CB" : "#00C2CB"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={(cleaningMaterial) => this.setState({cleaningMaterial})}
                        value={this.state.cleaningMaterial}
                    />
                    <Text style={styles.descriptionSwitchTxt}>
                        Material de Limpeza
                    </Text>
                </View>
                <View style={styles.inputBox}>
                    <Text style={styles.sessionDescriptionTxt}>
                        Foto da Instituição
                    </Text>
                    <Text style={styles.sessionDescriptionLowerTxt}>
                        Insira a foto da instituição na região a baixo.
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
                <View style={styles.inputBox}>
                    <Text style={styles.sessionDescriptionTxt}>
                        Localização da instituição
                    </Text>
                    <Text style={styles.sessionDescriptionLowerTxt}>
                        Insira as especificações da localização da instituição nos campos a baixo.
                    </Text>
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Cidade"
                        placeholderTextColor="#000000" 
                        onChangeText={(city) => this.setState({city})}
                        value={this.state.city}
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Bairro"
                        placeholderTextColor="#000000" 
                        onChangeText={(district) => this.setState({district})}
                        value={this.state.district}
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Rua/Avenina/Praça"
                        placeholderTextColor="#000000" 
                        onChangeText={(publicPlace) => this.setState({publicPlace})}
                        value={this.state.publicPlace}
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Nome da Rua"
                        placeholderTextColor="#000000" 
                        onChangeText={(publicPlaceName) => this.setState({publicPlaceName})}
                        value={this.state.publicPlaceName}
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.input}
                        placeholder="Número"
                        placeholderTextColor="#000000" 
                        onChangeText={(number) => this.setState({number})}
                        value={this.state.number}
                    />
                </View>
                <View style={[styles.inputBox, {marginBottom: 50}]}>
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
                <MessageUtils
                    isSuccess={this.state.isSuccess}
                    message={this.state.modalText}
                    callback={this.modalCallback}
                    modalVisible={this.state.modalVisible}
                />
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        height: "100%"
    },
    roundImage: {
        width: 285,
        height: 200,
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto'
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
    cardBox: {
        textAlign: "center",
        marginHorizontal: 14,
        marginVertical: 6,
        padding: 12,
        borderRadius: 14,
        backgroundColor: "#00C2CB",
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
        height: 160,
        textAlignVertical: 'top',
        borderWidth: 3,
        borderRadius: 10,
        padding: 10,
        paddingLeft: 22,
        color: "black",
        fontSize: 16
    },
});
