import React, { Component } from 'react';

import {
    StyleSheet,
    View,
    Modal,
    Text,
    Pressable,
    Image,
    TouchableOpacity,
} from 'react-native';

const OK = "200 - OK"
const CREATED = "201 - Criado"
const UNAUTHORIZED = "401 - Não Autorizado"
const FORBIDDEN = "403 - Proibido"
const NOTFOUND = "404 - Não Encontrado";
const INTERNALSERVER = "500 - Erro Interno do Servidor"

export default class MessageUtils extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            modalVisible: this.props.modalVisible,
            color: 'green',
        };
    }

    componentDidMount() {
        this.setValues();
    }

    setValues() {
        switch (this.props.topMessage) {
            case '200':
                this.setState({topMessage: OK});
                this.setState({color: 'green'});
                break;
            case '201':
                this.setState({topMessage: CREATED});
                this.setState({color: 'green'});
                break;
            case '401':
                this.setState({topMessage: UNAUTHORIZED});
                this.setState({color: 'red'});
                break;
            case '403':
                this.setState({topMessage: FORBIDDEN});
                this.setState({color: 'red'});
                break;
            case '404':
                this.setState({topMessage: NOTFOUND});
                this.setState({color: 'red'});
                break;
            case '500':
                this.setState({topMessage: INTERNALSERVER});
                this.setState({color: 'red'});
                break;
            default:
                this.setState({topMessage: "Mensagem"});
                this.setState({color: 'green'});
                break;
        }
    }

    onClose() {
        this.props.callback();
    }

    changeColor(cor) {
        return {
            backgroundColor: cor,
            paddingTop: 10,
            borderTopLeftRadius: 10,
            borderTopRightRadius: 10,
            width: "100%",
        }
    }

    render() {
        return (
            <View style={styles.menu}>
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={this.props.modalVisible}
                    style={styles.menu}
                    onRequestClose={() => {
                        this.onClose();
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={this.changeColor(this.state.color)}>
                                <Text style={styles.modalText}>{this.state.topMessage}</Text>
                            </View>
                            <Text style={styles.modalTextMessage}>{this.props.message}</Text>
                            <Pressable
                                style={styles.button}
                                onPress={() => this.onClose()}
                            >
                                <Text style={styles.textStyle}>Ok</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalView: {
        display: 'flex',
        flexDirection: 'column',
        width: "90%",
        backgroundColor: "white",
        borderRadius: 10,
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
    topBar: {
        backgroundColor: 'blue',
        paddingTop: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: "100%",
    },
    button: {
        backgroundColor: "gray",
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: "20%",
        marginLeft: 'auto',
        marginRight: 10,
        marginBottom: 10
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        color: "white",
        marginBottom: 12,
        textAlign: "center"
    },
    modalTextMessage: {
        color: "black",
        padding: 16,
        textAlign: "center"
    },
});
