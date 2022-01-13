import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/components/Home';
import Institution from './src/components/Institution';
import Institutions from './src/components/Institutions';
import Animals from './src/components/Animals';

const Stack = createNativeStackNavigator();
export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Institutions">
          <Stack.Screen name="Home" component={Home} options={{ title: 'Página Inicial' }} />
          <Stack.Screen name="Institution" component={Institution} options={{ title: 'Instituição' }} />
          <Stack.Screen name="Institutions" component={Institutions} options={{ title: 'Instituições' }} />
          <Stack.Screen name="Animals" component={Animals} options={{ title: 'Animais' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}