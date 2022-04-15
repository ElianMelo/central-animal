import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    FlatList
} from 'react-native';

import Footer from './Footer';

import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {Picker} from '@react-native-picker/picker';

import RequestService from '../services/RequestService';

const radio_props = [
    {label: 'Cachorro', value: 0 },
    {label: 'Gato', value: 1 }
];
export default class Animals extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            animals: {},
            animalsFilter: {},
            enableFilter: false,
            sex: 1,
            type: 0,            
        };
    }

    componentDidMount() {
        this.loadAnimals();
    }

    loadAnimals = async() => {
        let animals = await RequestService.getAnimalsByInstitution(this.props.route.params.institutionId);
        this.setState({animals})
        this.setState({animalsFilter: animals})
    }

    renderItem = ({ item }) => (
        <TouchableOpacity style={styles.cardBox}>
            <Image
                style={styles.roundCardImage}
                source={{uri: item.animalImage}}
            />
            <View style={styles.cardColumn}>
                <Text style={styles.nameTxt}>
                    {item.name}
                </Text>
                <Text style={styles.descriptionTxt}>
                    {item.description}
                </Text>
                <View style={styles.cardLine}>
                    <Text><Text style={styles.descriptionBolderTxt}>Sexo:</Text> <Text style={styles.descriptionTxt}>{item.sex == 1 ? "Macho" : "Fêmea"} </Text></Text>
                    <Text><Text style={styles.descriptionBolderTxt}>Idade:</Text> <Text style={styles.descriptionTxt}>{item.age}</Text></Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    filter = () => {
        let filtered = this.state.animals.filter((item) => {
            return item.sex == this.state.sex && item.type == (this.state.type+1)
        })
        this.setState({animalsFilter: filtered})
    }

    showFilter = () => {
        this.setState({enableFilter: !this.state.enableFilter});
    }

    render() {
        return (
            <View style={styles.body}>
                <View style={styles.cardColumn}>
                    <TouchableOpacity
                        onPress={() => this.showFilter()}
                    >
                        <Text style={styles.descriptionBolderTxtFilter}>Mostrar/Ocultar Filtro</Text>
                    </TouchableOpacity>

                    {
                        this.state.enableFilter ? (
                            <View>
                                <View style={styles.inputPicker}>
                                    <Picker
                                        style={{ height: 5, width: 130, color: 'black', borderWidth: 1}}
                                        onValueChange={(sex) => this.setState({sex})}
                                        selectedValue={this.state.sex}
                                        mode="dropdown"
                                        color="#000"
                                        dropdownIconColor="#000"
                                        dropdownIconRippleColor="#000"
                                    >
                                        <Picker.Item label="Macho" value="1" />
                                        <Picker.Item label="Fêmea" value="2" />
                                    </Picker>
                                </View>

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
                                                buttonSize={15}
                                                buttonOuterSize={25}
                                                buttonWrapStyle={{marginLeft: 8}}
                                            />
                                            <RadioButtonLabel
                                                obj={obj}
                                                index={i}
                                                onPress={(type) => {this.setState({type})}}
                                                labelHorizontal={true}
                                                labelStyle={{fontSize: 16, color: '#000'}}
                                                labelWrapStyle={{}}
                                            />
                                        </RadioButton>
                                        ))
                                    }  
                                </RadioForm>
                                <TouchableOpacity
                                    onPress={() => this.filter()}
                                >
                                    <Text style={styles.descriptionBolderTxtFilter}>Aplicar Filtro</Text>
                                </TouchableOpacity>
                            </View>
                        ) : null
                    }                    
                </View>

                <FlatList
                    data={this.state.animalsFilter}
                    style={styles.bottomMargin}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                />
                <Footer navigation={this.state.props.navigation}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        height: "100%",
        backgroundColor: "white"
    },
    bottomMargin: {
        marginBottom: 70,
        width: "100%"
    },
    cardColumn: {
        paddingVertical: 14,
        paddingHorizontal: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    cardLine: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'space-between',
    },
    cardBox: {
        textAlign: "center",
        marginHorizontal: 6,
        marginVertical: 8,
        borderRadius: 16,
        backgroundColor: "white",        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
        width: "47%"
    },
    nameTxt: {
        marginRight: 'auto',
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "left",
        color: "black"
    },
    descriptionTxt: {
        marginRight: 'auto',
        fontSize: 14,
        marginTop: 8,
        textAlign: "left",
        color: "black"
    },
    descriptionBolderTxt: {
        marginRight: 'auto',
        fontSize: 14,
        marginTop: 4,
        textAlign: "left",
        fontWeight: "bold",
        color: "black"
    },
    descriptionBolderTxtFilter: {
        marginRight: 'auto',
        fontSize: 16,
        marginTop: 4,
        textAlign: "left",
        fontWeight: "bold",
        color: "black"
    },
    roundCardImage: {
        marginRight: 'auto',
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        width: "100%",
        height: 100,
    },
    inputPicker: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        width: 120,
        margin: 8,
        borderWidth: 1,
        color: "black",
        fontSize: 16
    }
});
