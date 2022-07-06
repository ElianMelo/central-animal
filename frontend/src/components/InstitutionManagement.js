import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    Image,
    ScrollView,
    ActivityIndicator
} from 'react-native';

import Footer from './Footer';

import RequestService from '../services/RequestService';
import TokenService from '../services/TokenService';
import InstitutionService from '../services/InstitutionService';

import central_animal from '../../assets/central-animal.png';

const atualizarInstituicao = require('../../assets/atualizar-instituicao.png');
const cadastrarAnimal = require('../../assets/cadastrar-animal.png');
const alteraAnimal = require('../../assets/alterar-animal.png');
const criaInstituicao = require('../../assets/criar-instituicao.png');
const deslogar = require('../../assets/deslogar.png');

export default class InstitutionManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            props: props,
            willFocusSubscription: null,
            logged: false,
            borderColorEmail: 'gray',
            borderColorPass: 'gray',
            email: '',
            password: '',
            institutionId: '',
            showCreateInstitution: false,
            loaded: false
        };
    }

    componentDidMount() {
        this.getInstitution();
        this.setState({ loaded: false })
        RequestService.validateToken().then((isValid) => {
            if (isValid) {
                this.setState({ logged: true });
                this.getInstitution();
            } else {
                this.setState({ logged: false });
                this.getInstitution();
            }
            this.setState({ loaded: true })
        });
        this.setState({
            willFocusSubscription: this.state.props.navigation.addListener(
                'focus',
                () => {
                    this.setState({ loaded: false })
                    RequestService.validateToken().then((isValid) => {
                        if (isValid) {
                            this.setState({ logged: true });
                            this.getInstitution();
                        } else {
                            this.setState({ logged: false });
                            this.getInstitution();
                        }
                        this.setState({ loaded: true })
                    });
                }
            )
        })
    }

    getInstitution = async () => {
        let institutionId = await InstitutionService.getInstitution();
        if (!institutionId || Number(institutionId) == NaN) {
            this.setState({ showCreateInstitution: true })
        } else {
            this.setState({ showCreateInstitution: false })
        }
        this.setState({ institutionId });
    }

    componentWillUnmount() {
        this.state.willFocusSubscription();
    }

    doLogin() {
        if (this.state.email != '' && this.state.password != '') {
            this.setState({ isLoading: true })
            let login = {
                email: this.state.email,
                password: this.state.password
            }
            RequestService.postLogin(login).then(() => {
                RequestService.validateToken().then((isValid) => { if (isValid) this.setState({ logged: true }) });
                this.getInstitution();
            }).finally(() => {
                const timer = setTimeout(() => {
                    this.setState({ isLoading: false });
                    clearTimeout(timer);
                }, 1500);
            });
        }
    }

    logout = async () => {
        await TokenService.setToken('null');
        await InstitutionService.setInstitution('null');
        let isValid = await RequestService.validateToken();
        if (!isValid) this.setState({ logged: false })
        this.setState({ institutionId: null });
    }

    login() {
        return (
            <View style={[styles.marginBottomFooter, styles.buttonsInline]}>

                {
                    !this.state.showCreateInstitution &&
                    <>
                        <View>
                            <TouchableOpacity
                                style={styles.instBox}
                                onPress={() =>
                                    this.props.navigation.navigate('ChangeInstitution', {
                                        institutionId: this.state.institutionId
                                    })
                                }
                            >
                                <Image
                                    style={styles.manageImage}
                                    source={atualizarInstituicao}
                                />
                                <View style={styles.cardImageLine}>
                                    <Text style={styles.cardSupTxtManage}>
                                        Alterar Instituição
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={styles.instBox}
                                onPress={() =>
                                    this.props.navigation.navigate('CreateAnimal', {
                                        institutionId: this.state.institutionId
                                    })
                                }
                            >
                                <Image
                                    style={styles.manageImage}
                                    source={cadastrarAnimal}
                                />
                                <View style={styles.cardImageLine}>
                                    <Text style={styles.cardSupTxtManage}>
                                        Criar Animal
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View>
                            <TouchableOpacity
                                style={styles.instBox}
                                onPress={() =>
                                    this.props.navigation.navigate('AnimalsEdit', {
                                        institutionId: this.state.institutionId
                                    })
                                }
                            >
                                <Image
                                    style={styles.manageImage}
                                    source={alteraAnimal}
                                />
                                <View style={styles.cardImageLine}>
                                    <Text style={styles.cardSupTxtManage}>
                                        Alterar Animal
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </>
                }
                {
                    this.state.showCreateInstitution &&
                    <View>
                        <TouchableOpacity
                            style={styles.instBox}
                            onPress={() =>
                                this.props.navigation.navigate('CreateUser')
                            }
                        >
                            <Image
                                style={styles.manageImage}
                                source={criaInstituicao}
                            />
                            <View style={styles.cardImageLine}>
                                <Text style={styles.cardSupTxtManage}>
                                    Criar Instituição
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                }
                <View>
                    <TouchableOpacity
                        style={styles.instBox}
                        onPress={() => this.logout()}
                    >
                        <Image
                            style={styles.manageImage}
                            source={deslogar}
                        />
                        <View style={styles.cardImageLine}>
                            <Text style={styles.cardSupTxtManage}>
                                Deslogar
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    management() {
        return (
            <View style={styles.marginBottomFooter}>
                <View style={styles.inputBox}>
                    <Image
                        style={styles.logoImage}
                        source={central_animal}
                    >
                    </Image>
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={[styles.input, { borderColor: this.state.borderColorEmail }]}
                        placeholderTextColor="#808080"
                        placeholder="E-mail"
                        onChangeText={(email) => this.setState({ email })}
                        value={this.state.email}
                    />
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={[styles.input, { borderColor: this.state.borderColorPass }]}
                        placeholderTextColor="#808080"
                        placeholder="Senha"
                        onChangeText={(password) => this.setState({ password })}
                        value={this.state.password}
                        secureTextEntry={true}
                    />
                </View>
                <View style={styles.cardBox}>
                    <TouchableOpacity
                        onPress={() => this.doLogin()}
                    >
                        <View style={styles.cardImageLine}>
                            {!this.state.isLoading ? (
                                <Text style={styles.cardSupTxt}>
                                    Entrar
                                </Text>
                            ) : (
                                <ActivityIndicator
                                    color="#00C2CB"
                                    animating={this.state.isLoading}
                                    size={32}
                                />
                            )}
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }

    render() {
        return (
            <View style={styles.body} layout>
                {this.state.loaded ?
                    (
                        <ScrollView style={{ height: "100%", marginTop: 'auto', marginBottom: 'auto' }}>
                            {this.state.logged ? this.login() : this.management()}
                        </ScrollView>
                    ) :
                    (<View
                        style={styles.loadingLoginView}
                    >
                        <ActivityIndicator
                            color="#00C2CB"
                            animating={!this.state.loaded}
                            size={64}
                        />
                    </View>
                    )
                }

            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        height: "100%",
        backgroundColor: "white"
    },
    logoImage: {
        marginRight: 'auto',
        marginLeft: 'auto',
        width: 300,
        height: 300,
    },
    manageImage: {
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 'auto',
        marginBottom: 'auto',
        width: 80,
        height: 80,
    },
    inputBox: {
        padding: 5,
        borderRadius: 10,
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
    cardBox: {
        textAlign: "center",
        marginHorizontal: 20,
        marginVertical: 5,
        backgroundColor: "white",
        borderRadius: 14,
        borderWidth: 4,
        borderColor: '#00C2CB'
    },
    buttonsInline: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        marginHorizontal: 5
    },
    instBox: {
        height: 200,
        width: 180,
        display: 'flex',
        flexDirection: 'column',
        textAlign: "center",
        marginVertical: 5,
        backgroundColor: "white",
        borderRadius: 14,
        borderWidth: 4,
        borderColor: 'black'
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
        padding: 12,
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
        marginBottom: 5,
        fontSize: 20,
        textAlign: "center",
        color: "black"
    },
    cardSupTxt: {
        width: "100%",
        height: "100%",
        fontSize: 24,
        textAlign: "center",
        fontWeight: "500",
        color: "#00C2CB"
    },
    cardSupTxtManage: {
        width: "100%",
        height: "100%",
        fontSize: 18,
        textAlign: "center",
        fontWeight: "500",
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
    marginBottomFooter: {
        marginBottom: 60,
        marginTop: 60
    },
    h1Text: {
        fontSize: 32,
        margin: 16,
        fontWeight: "bold",
        textAlign: "center",
        color: "#000"
    },
    loadingLoginView: {
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center'
    }
});
