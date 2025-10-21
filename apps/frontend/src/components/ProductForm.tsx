import React from 'react';
import {
  View, Text, TextInput, Switch, TouchableOpacity,
  StyleSheet, ActivityIndicator
} from 'react-native';
import { Controller, Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';
import { Picker } from '@react-native-picker/picker';
import { ProductFormData } from 'shared';

interface ProductFormProps {
  control: Control<ProductFormData>;
  errors: FieldErrors<ProductFormData>;
  handleSubmit: UseFormHandleSubmit<ProductFormData>;
  onSubmit: (data: ProductFormData) => void;
  loading: boolean;
  submitButtonText: string;
}

const ProductForm: React.FC<ProductFormProps> = ({ control, errors, handleSubmit, onSubmit, loading, submitButtonText }) => {
  const categories = ["HARDWARE", "SOFTWARE", "ACESSORIOS", "SERVICOS", "OUTROS"];

  return (
    <View style={styles.card}>
      {/* NOME */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Nome do Produto</Text>
        <Controller control={control} name="nome" render={({ field: { onChange, onBlur, value } }) => (<TextInput style={[styles.input, errors.nome && styles.inputError]} onChangeText={onChange} onBlur={onBlur} value={value} placeholder="Ex: Mouse Gamer RGB" />)} />
        {errors.nome && <Text style={styles.errorText}>{errors.nome.message}</Text>}
      </View>

      {/* PREÇO */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Preço</Text>
        <Controller control={control} name="preco" render={({ field: { onChange, onBlur, value } }) => (<TextInput style={[styles.input, errors.preco && styles.inputError]} onChangeText={onChange} onBlur={onBlur} value={value ? String(value) : ''} keyboardType="numeric" placeholder="Ex: 150.50" />)} />
        {errors.preco && <Text style={styles.errorText}>{errors.preco.message}</Text>}
      </View>

      {/* ESTOQUE */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Estoque</Text>
        <Controller control={control} name="estoque" render={({ field: { onChange, onBlur, value } }) => (<TextInput style={[styles.input, errors.estoque && styles.inputError]} onChangeText={onChange} onBlur={onBlur} value={value ? String(value) : ''} keyboardType="numeric" placeholder="Ex: 50" />)} />
        {errors.estoque && <Text style={styles.errorText}>{errors.estoque.message}</Text>}
      </View>

      {/* CATEGORIA */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Categoria</Text>
        <Controller control={control} name="categoria" render={({ field: { onChange, value } }) => (<View style={[styles.pickerContainer, errors.categoria && styles.inputError]}><Picker selectedValue={value} onValueChange={onChange}><Picker.Item label="Selecione..." value={undefined} />{categories.map(cat => <Picker.Item key={cat} label={cat} value={cat} />)}</Picker></View>)} />
        {errors.categoria && <Text style={styles.errorText}>{errors.categoria.message}</Text>}
      </View>

      {/* DESCRIÇÃO */}
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Descrição (Opcional)</Text>
        <Controller control={control} name="descricao" render={({ field: { onChange, onBlur, value } }) => (<TextInput style={[styles.input, styles.multilineInput]} onChangeText={onChange} onBlur={onBlur} value={value || ''} multiline numberOfLines={4} placeholder="Detalhes do produto..." />)} />
        {errors.descricao && <Text style={styles.errorText}>{errors.descricao.message}</Text>}
      </View>

      {/* ATIVO */}
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Produto Ativo</Text>
        <Controller control={control} name="ativo" render={({ field: { onChange, value } }) => (<Switch value={value} onValueChange={onChange} trackColor={{ false: "#767577", true: "#81b0ff" }} thumbColor={value ? "#6200ee" : "#f4f3f4"} />)} />
      </View>

      {/* SUBMIT BUTTON */}
      {loading ? (
        <ActivityIndicator size="large" color="#6200ee" style={styles.spinner} />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={styles.buttonText}>{submitButtonText}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: { backgroundColor: '#fff', borderRadius: 12, padding: 20, elevation: 3, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  fieldContainer: { marginBottom: 20 },
  label: { fontSize: 16, fontWeight: 'bold', marginBottom: 8, color: '#333' },
  input: { backgroundColor: '#f8f9fa', paddingHorizontal: 15, height: 50, borderRadius: 8, borderWidth: 1, borderColor: '#dee2e6', fontSize: 16 },
  multilineInput: { height: 100, textAlignVertical: 'top', paddingTop: 15 },
  inputError: { borderColor: '#d32f2f', borderWidth: 2 },
  errorText: { color: '#d32f2f', marginTop: 5, fontSize: 14 },
  pickerContainer: { backgroundColor: '#f8f9fa', borderRadius: 8, borderWidth: 1, borderColor: '#dee2e6', justifyContent: 'center', height: 50 },
  switchContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginVertical: 15 },
  spinner: { marginTop: 20 },
  button: { backgroundColor: '#6200ee', paddingVertical: 15, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  buttonText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
});

export default ProductForm;