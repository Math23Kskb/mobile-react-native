import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  Text,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView,
  Switch,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { productSchema, ProductFormData } from '../../../../packages/shared/src/index';
import api from '../api/api';
import { Picker } from '@react-native-picker/picker';

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
      console.error(err);
      Alert.alert('Erro', 'Não foi possível criar o produto.');
    } finally {
      setLoading(false);
    }
  };

  const categories = ["HARDWARE", "SOFTWARE", "ACESSORIOS", "SERVICOS", "OUTROS"];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* NOME */}
      <Text style={styles.label}>Nome do Produto</Text>
      <Controller
        control={control}
        name="nome"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={[styles.input, errors.nome && styles.inputError]} onChangeText={onChange} onBlur={onBlur} value={value} />
        )}
      />
      {errors.nome && <Text style={styles.errorText}>{errors.nome.message}</Text>}

      {/* PREÇO */}
      <Text style={styles.label}>Preço</Text>
      <Controller
        control={control}
        name="preco"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={[styles.input, errors.preco && styles.inputError]} onChangeText={onChange} onBlur={onBlur} value={value ? String(value) : ''} keyboardType="numeric" />
        )}
      />
      {errors.preco && <Text style={styles.errorText}>{errors.preco.message}</Text>}

      {/* ESTOQUE */}
      <Text style={styles.label}>Estoque</Text>
      <Controller
        control={control}
        name="estoque"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={[styles.input, errors.estoque && styles.inputError]} onChangeText={onChange} onBlur={onBlur} value={value ? String(value) : ''} keyboardType="numeric" />
        )}
      />
      {errors.estoque && <Text style={styles.errorText}>{errors.estoque.message}</Text>}
      
      {/* CATEGORIA */}
      <Text style={styles.label}>Categoria</Text>
      <Controller
        control={control}
        name="categoria"
        render={({ field: { onChange, value } }) => (
          <View style={[styles.pickerContainer, errors.categoria && styles.inputError]}>
            <Picker selectedValue={value} onValueChange={onChange}>
              <Picker.Item label="Selecione uma categoria..." value={undefined} />
              {categories.map(cat => <Picker.Item key={cat} label={cat} value={cat} />)}
            </Picker>
          </View>
        )}
      />
      {errors.categoria && <Text style={styles.errorText}>{errors.categoria.message}</Text>}

      {/* DESCRIÇÃO */}
      <Text style={styles.label}>Descrição (Opcional)</Text>
      <Controller
        control={control}
        name="descricao"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput style={[styles.input, styles.multilineInput]} onChangeText={onChange} onBlur={onBlur} value={value} multiline numberOfLines={3} />
        )}
      />
      {errors.descricao && <Text style={styles.errorText}>{errors.descricao.message}</Text>}
      
      {/* ATIVO */}
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Produto Ativo</Text>
        <Controller
          control={control}
          name="ativo"
          render={({ field: { onChange, value } }) => (
            <Switch value={value} onValueChange={onChange} />
          )}
        />
      </View>

      {loading ? <ActivityIndicator size="large" color="#6200ee" style={styles.spinner} /> : <Button title="Criar Produto" onPress={handleSubmit(onSubmit)} />}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  multilineInput: {
    height: 80,
    textAlignVertical: 'top',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
  spinner: {
    marginTop: 20,
  },
  pickerContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
    justifyContent: 'center',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
  }
});

export default CreateProductScreen;