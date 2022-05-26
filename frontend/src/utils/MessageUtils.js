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
        if (this.props.topColor) {
            this.setState({color: this.props.topColor});
        }
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
                            <View style={this.changeColor(this.state.color)}>
                            </View>
                            <Text style={styles.modalTextMessage}>{this.props.message}</Text>
                            <Pressable
                                style={styles.button}
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
        backgroundColor: "black",
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
        fontSize: 18,
        padding: 16,
        textAlign: "center"
    },
});
