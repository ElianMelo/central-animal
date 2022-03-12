import React, { Component } from 'react';

import {
    StyleSheet,
    Text,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    Button
} from 'react-native';

import RequestService from '../services/RequestService';
export default class ChangeAnimal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            props: props,
            willFocusSubscription: null,
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
    }
    
    componentWillUnmount() {
        this.state.willFocusSubscription();
    }

    render() {
        return (
            <View style={styles.body}>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        height: "100%"
    },
});
