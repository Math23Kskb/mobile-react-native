import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import ListProductsScreen from '../screens/ListProductsScreen';
import CreateProductScreen from '../screens/CreateProductScreen';
import EditProductScreen from '../screens/EditProductScreen';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  ListProducts: undefined;
  CreateProduct: undefined;
  EditProduct: { productId: number};
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash">

        <Stack.Screen 
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}  
        />
        <Stack.Screen 
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}  
        />

        <Stack.Screen 
          name="ListProducts" 
          component={ListProductsScreen}
          options={{
            title: 'Todos os Produtos',
            headerBackTitle: 'Voltar'
          }} 
        />
        <Stack.Screen 
          name="CreateProduct" 
          component={CreateProductScreen}
          options={{
            title: 'Criar Novo Produto',
            headerBackTitle: 'Voltar'
          }}
        />
        <Stack.Screen 
          name="EditProduct" 
          component={EditProductScreen}
          options={{
            title: 'Editar Produto',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;