import React, { useState } from 'react';
import { StyleSheet, Alert, ScrollView } from 'react-native';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductFormData } from '../../../../packages/shared/src/index'; 
import api from '../api/api';
import { AxiosError } from 'axios';
import ProductForm from '../components/ProductForm';

const CreateProductScreen = () => {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      nome: '',
      preco: undefined,
      categoria: undefined,
      estoque: undefined,
      descricao: '',
      ativo: true,
    },
  });

  const onSubmit = async (data: ProductFormData) => {
    setLoading(true);
    try {
      await api.post('/products', data);
      Alert.alert('Sucesso', 'Produto criado com sucesso!');
      reset();
    } catch (err) {
      console.error("API Error:", err);
      let message = 'Não foi possível criar o produto.';
      if (err instanceof AxiosError && err.response?.data?.message) {
        message = err.response.data.message;
      }
      Alert.alert('Erro', message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <ProductForm 
        control={control}
        errors={errors}
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        loading={loading}
        submitButtonText="Criar Produto"
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f2f5',
  },
  scrollContent: {
    padding: 20,
  },
});

export default CreateProductScreen;