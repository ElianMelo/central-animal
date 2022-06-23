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

import sucesso from '../../assets/sucesso.png';
import falha from '../../assets/falha.png';

export default class MessageUtils extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            modalVisible: this.props.modalVisible,
            isSuccess: this.props.isSuccess,
            successColor: '#00C2CB',
            failColor: '#DC3545',
        };
    }

    onClose() {
        this.props.callback();
    }

    changeColor(cor) {
        return {
            backgroundColor: cor,
            paddingTop: 24,
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
                            <Image
                                style={styles.logoImage}
                                source={this.state.isSuccess ? sucesso : falha}
                            >
                            </Image>
                            <Text style={styles.modalTextMessage}>{this.props.message}</Text>
                            <Pressable
                                style={[styles.button, {backgroundColor: this.state.isSuccess ? this.state.successColor : this.state.failColor}]}
                                onPress={() => this.onClose()}
                            >
                                <Text style={styles.textStyle}>OK</Text>
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
    logoImage: {
        marginRight: 'auto',
        marginLeft: 'auto',
        marginTop: 26,
        width: 100,
        height: 100,
    },
    modalView: {
        display: 'flex',
        flexDirection: 'column',
        width: "70%",
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
        borderRadius: 10,
        padding: 10,
        elevation: 2,
        width: "80%",
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom: 18
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
        fontSize: 18,
        padding: 16,
        textAlign: "center"
    },
});
