import React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import api from '../api/api';


interface Product {
  id_produto: number;
  nome: string;
  preco: string;
  estoque: number;
  categoria: string;
}

type ListProductsNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ListProducts'>;

const ListProductsScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<ListProductsNavigationProp>();

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await api.get('/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (productId: number) => {
    Alert.alert(
      "Confirmar Deleção",
      "Você tem certeza que deseja deletar este produto? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Deletar", 
          style: "destructive", 
          onPress: async () => {
            try {
              await api.delete(`/products/${productId}`);
              setProducts(currentProducts => 
                currentProducts.filter(p => p.id_produto !== productId)
              );
              Alert.alert('Sucesso', 'Produto deletado com sucesso!');
            } catch (error) {
              console.error("Falha ao deletar produto:", error);
              Alert.alert('Erro', 'Não foi possível deletar o produto.');
            }
          }
        }
      ]
    );
  };

  useFocusEffect(React.useCallback(() => { fetchProducts(); }, []));

  if (loading) {
    return <View style={styles.centerContainer}><ActivityIndicator size="large" color="#6200ee" /></View>;
  }
  
  const renderItem = ({ item }: { item: Product }) => (
    <View style={styles.productCard}>
      <View style={styles.productInfo}>
        <Text style={styles.productName}>{item.nome}</Text>
        <Text style={styles.productCategory}>{item.categoria}</Text>
        <Text style={styles.productPrice}>R$ {Number(item.preco).toFixed(2).replace('.', ',')}</Text>
      </View>
      
      {/* Container para o Estoque e Botões */}
      <View style={styles.actionsContainer}>
        <View style={styles.productStock}>
          <Text style={styles.stockLabel}>Estoque</Text>
          <Text style={styles.stockValue}>{item.estoque}</Text>
        </View>
        {/* Botões de Ação */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => navigation.navigate('EditProduct', { productId: item.id_produto })}
          >
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.deleteButton}
            onPress={() => handleDelete(item.id_produto)}
          >
            <Text style={styles.buttonText}>Deletar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => String(item.id_produto)}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum produto encontrado.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f0f2f5', 
  },
  centerContainer: { 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  listContainer: { 
    padding: 10 
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  productInfo: { 
    flex: 1, 
    marginRight: 10,
  },
  productName: { 
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#333',
  },
  productCategory: { 
    fontSize: 12, 
    color: 'gray', 
    textTransform: 'capitalize', 
    marginVertical: 4 
  },
  productPrice: { 
    fontSize: 14, 
    color: '#6200ee', 
    fontWeight: '500' 
  },
  productStock: { 
    alignItems: 'center' 
  },
  stockLabel: { 
    fontSize: 12, 
    color: 'gray' 
  },
  stockValue: { 
    fontSize: 18, 
    fontWeight: 'bold',
    color: '#333',
  },
  emptyText: { 
    textAlign: 'center', 
    marginTop: 50, 
    color: 'gray' 
  },
  actionsContainer: {
    alignItems: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  editButton: {
    backgroundColor: '#ffc107',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 8,
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default ListProductsScreen;