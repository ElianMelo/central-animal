import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { Snackbar } from 'react-native-paper';

export default class SnackBar extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            props: props,
            snackBarVisible: this.props.snackBarVisible,
        };
    }

  render() {
    return (
        <Snackbar
            style={styles.snackBar}
            visible={this.props.snackBarVisible}
            onDismiss={() => this.props.callback()}
            duration={1000}
        >
            <Text>
                Copiado para área de transferência!
            </Text>
        </Snackbar>
    );
  }
}

const styles = StyleSheet.create({
    snackBar: {
        backgroundColor: '#4e9a51',
        marginBottom: 80,
    },
});