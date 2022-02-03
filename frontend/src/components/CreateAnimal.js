import React, { Component } from 'react';

import {
    StyleSheet,
    TextInput,
    Text,
    View,
    CheckBox,
    Image,
    FlatList,
    TouchableOpacity,
    Button
} from 'react-native';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';

import {Picker} from '@react-native-picker/picker';

const radio_props = [
    {label: 'Cachorro     ', value: 0 },
    {label: 'Gato', value: 1 }
];
export default class CreateAnimal extends Component {

    /*const [text, onChangeText] = React.useState("Useless Text");*/

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            name: '',
            description: '',
            type: '',
            sex: ''
        };
    }

    render() {
        return (
            <View style={styles.body}>
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
                        radio_props={radio_props}
                        formHorizontal={true}
                        initial={0}
                        onPress={(type) => {this.setState({type})}}
                    />
                </View>
                <View style={styles.inputBoxInline}>
                    <Text style={styles.descriptionTxtInline}>
                        Idade
                    </Text>
                    <TextInput
                        style={styles.inputWide}
                        placeholder="Ex: 0"
                        placeholderTextColor="#808080" 
                        onChangeText={(name) => this.setState({name})}
                        value={this.state.name}
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
                            <Picker.Item label="Macho" value="java" />
                            <Picker.Item label="Fêmea" value="js" />
                        </Picker>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        height: "100%"
    },
    inputBox: {
        padding: 5,
        marginRight: 16,
        marginLeft: 16,
        marginTop: 6
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
