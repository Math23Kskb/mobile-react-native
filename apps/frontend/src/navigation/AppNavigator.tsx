import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from '../screens/SplashScreen';
import HomeScreen from '../screens/HomeScreen';
import ListProductsScreen from '../screens/ListProductsScreen';
import CreateProductScreen from '../screens/CreateProductScreen';

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  ListProducts: undefined;
  CreateProduct: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ListProducts" component={ListProductsScreen} />
        <Stack.Screen name="CreateProduct" component={CreateProductScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;