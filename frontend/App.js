import React, { Component } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/components/Home';
import Institution from './src/components/Institution';
import Institutions from './src/components/Institutions';
import Animals from './src/components/Animals';
import AnimalsEdit from './src/components/AnimalsEdit';
import InstitutionManagement from './src/components/InstitutionManagement';
import CreateAnimal from './src/components/CreateAnimal';
import ChangeAnimal from './src/components/ChangeAnimal';
import ChangeInstitution from './src/components/ChangeInstitution';
import MapViewerScreen from './src/components/MapViewerScreen';

const Stack = createNativeStackNavigator();
export default class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="InstitutionManagement">
          <Stack.Screen name="Home" component={Home} options={{ title: 'Página Inicial' }} />
          <Stack.Screen name="Institution" component={Institution} options={{ title: 'Instituição' }} />
          <Stack.Screen name="Institutions" component={Institutions} options={{ title: 'Instituições' }} />
          <Stack.Screen name="Animals" component={Animals} options={{ title: 'Animais' }} />
          <Stack.Screen name="AnimalsEdit" component={AnimalsEdit} options={{ title: 'Edição de Animal' }} />
          <Stack.Screen name="InstitutionManagement" component={InstitutionManagement} options={{ title: 'Login/Gerência de Instituição' }} />
          <Stack.Screen name="CreateAnimal" component={CreateAnimal} options={{ title: 'Cadastrar Animal' }} />
          <Stack.Screen name="ChangeAnimal" component={ChangeAnimal} options={{ title: 'Alterar Animal' }} />
          <Stack.Screen name="ChangeInstitution" component={ChangeInstitution} options={{ title: 'Alterar Instituição' }} />
          <Stack.Screen name="MapViewerScreen" component={MapViewerScreen} options={{ title: 'Mapa Região' }} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}