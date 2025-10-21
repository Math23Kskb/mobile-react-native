import React, { useState, useEffect } from 'react';
import { StyleSheet, Alert, ScrollView, View, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { updateProductSchema, ProductFormData } from '../../../../packages/shared/src/index';
import { RootStackParamList } from '../navigation/AppNavigator';
import api from '../api/api';
import { AxiosError } from 'axios';
import ProductForm from '../components/ProductForm';

type EditProductRouteProp = RouteProp<RootStackParamList, 'EditProduct'>;

const EditProductScreen = () => {
  const route = useRoute<EditProductRouteProp>();
  const navigation = useNavigation();
  const { productId } = route.params;

  const [loading, setLoading] = useState(true);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(updateProductSchema),
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${productId}`);
        const product = response.data;
        reset({ ...product, preco: Number(product.preco) });
      } catch (error) {
        Alert.alert('Erro', 'Não foi possível carregar os dados do produto.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId, reset]);

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      const filteredData = Object.fromEntries(Object.entries(data).filter(([_, v]) => v !== undefined && v !== ''));
      await api.put(`/products/${productId}`, filteredData);
      Alert.alert('Sucesso', 'Produto atualizado com sucesso!');
      navigation.goBack();
    } catch (err) {
      console.error("API Error:", err);
      let message = 'Não foi possível atualizar o produto.';
      if (err instanceof AxiosError && err.response?.data?.message) {
        message = err.response.data.message;
      }
      Alert.alert('Erro', message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <View style={styles.centerContainer}><ActivityIndicator size="large" color="#6200ee" /></View>;
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <ProductForm 
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        loading={loading}
        submitButtonText="Salvar Alterações"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  scrollContent: { padding: 20 },
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});

export default EditProductScreen;