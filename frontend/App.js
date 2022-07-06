import React, { Component } from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/components/Home';
import Institution from './src/components/Institution';
import Institutions from './src/components/Institutions';
import Animals from './src/components/Animals';
import AnimalsEdit from './src/components/AnimalsEdit';
import InstitutionManagement from './src/components/InstitutionManagement';
import CreateAnimal from './src/components/CreateAnimal';
import CreateUser from './src/components/CreateUser';
import ChangeAnimal from './src/components/ChangeAnimal';
import ChangeInstitution from './src/components/ChangeInstitution';
import CreateAnimalCoord from './src/components/CreateAnimalCoord'
import Map from './src/components/Map';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();
export default class App extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount = () => { 
    SplashScreen.hide()
  }

  render() {
    return (
      <>
        <StatusBar 
          barStyle={'dark-content'}
          backgroundColor="#fff"
        />
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={Home} options={{ title: 'Página Inicial', headerShown: false }} />
            <Stack.Screen name="Map" component={Map} options={{ title: 'Mapa', headerShown: false }} />
            <Stack.Screen name="Institution" component={Institution} options={{ title: 'Instituição', headerShown: false }} />
            <Stack.Screen name="Institutions" component={Institutions} options={{ title: 'Instituições', headerShown: false }} />
            <Stack.Screen name="Animals" component={Animals} options={{ title: 'Animais', headerShown: false }} />
            <Stack.Screen name="AnimalsEdit" component={AnimalsEdit} options={{ title: 'Edição de Animal', headerShown: false }} />
            <Stack.Screen name="InstitutionManagement" component={InstitutionManagement} options={{ title: 'Login/Gerência de Instituição' , headerShown: false}} />
            <Stack.Screen name="CreateAnimal" component={CreateAnimal} options={{ title: 'Cadastrar Animal', headerShown: false }} />
            <Stack.Screen name="CreateAnimalCoord" component={CreateAnimalCoord} options={{ title: 'Cadastrar Animal Coordenada', headerShown: false }} />
            <Stack.Screen name="CreateUser" component={CreateUser} options={{ title: 'Criar Usuário' , headerShown: false}} />
            <Stack.Screen name="ChangeAnimal" component={ChangeAnimal} options={{ title: 'Alterar Animal', headerShown: false }} />
            <Stack.Screen name="ChangeInstitution" component={ChangeInstitution} options={{ title: 'Alterar Instituição' , headerShown: false}} />
          </Stack.Navigator>
        </NavigationContainer>
      </>
    );
  }
}