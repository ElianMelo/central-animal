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

const NOTFOUND = '404 - Não Encontrado';
const INTERNALSERVER = '500 - Erro Interno do Servidor'

export default class MessageUtils extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            modalVisible: this.props.modalVisible,
        };
    }

    onClose() {
        this.props.callback();
    }

    render() {
        return (
            <View style={styles.menu}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.props.modalVisible}
                    onRequestClose={() => {
                        this.onClose();
                    }}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View style={styles.topBar}>
                                <Text style={styles.modalText}>{this.props.topMessage}</Text>
                            </View>
                            <Text style={styles.modalTextMessage}>{this.props.message}</Text>
                            <Pressable
                                style={[styles.button, styles.buttonClose]}
                                onPress={() => this.onClose()}
                            >
                                <Text style={styles.textStyle}>Fechar</Text>
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
        marginTop: 22
    },
    modalView: {
        display: 'flex',
        flexDirection: 'column',
        width: "50%",
        /*margin: 20,*/
        backgroundColor: "white",
        borderRadius: 10,
        /*padding: 35,*/
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
        backgroundColor: '#DC3545',
        paddingTop: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: "100%",
    },
    button: {
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: "80%",
        marginBottom: 10
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
