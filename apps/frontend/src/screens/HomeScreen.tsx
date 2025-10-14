import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { RootStackParamList } from '../navigation/AppNavigator';

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen = () => {
  const navigation = useNavigation<HomeNavigationProp>();

  return (
    <View style={styles.container}>
      <Button
        title="Criar Produto"
        onPress={() => navigation.navigate('CreateProduct')}
      />
      <View style={styles.spacer} />
      <Button
        title="Listar Produtos"
        onPress={() => navigation.navigate('ListProducts')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  spacer: {
    height: 16,
  },
});

export default HomeScreen;