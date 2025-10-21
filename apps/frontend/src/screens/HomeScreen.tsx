// In apps/frontend/src/screens/HomeScreen.tsx

import React, { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, FlatList,
  ScrollView, StatusBar, ActivityIndicator
} from 'react-native';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import api from '../api/api';

type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Home'>;

interface StatsData { totalProducts: number; totalStockValue: number; }
interface RecentProduct { id_produto: string; nome: string; estoque: number; }

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const [stats, setStats] = useState<StatsData | null>(null);
  const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [statsResponse, recentProductsResponse] = await Promise.all([
        api.get('/products/stats'),
        api.get('/products/recent'),
      ]);
      setStats(statsResponse.data);
      setRecentProducts(recentProductsResponse.data);
    } catch (err) {
      console.error("Failed to fetch dashboard data:", err);
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(React.useCallback(() => { fetchData(); }, []));

  const formatCurrency = (value: number) => `R$ ${value.toFixed(2).replace('.', ',')}`;

  if (loading) {
    return <View style={styles.centerContainer}><ActivityIndicator size="large" color="#6200ee" /></View>;
  }

  return (
    <ScrollView style={styles.container}>
      {/* (The full beautiful UI code goes here, same as provided before) */}
       <StatusBar barStyle="light-content" backgroundColor="#6200ee" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Dashboard</Text>
        <Text style={styles.headerSubtitle}>Bem-vindo de volta!</Text>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{stats?.totalProducts ?? 0}</Text>
          <Text style={styles.statLabel}>Produtos Totais</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statValue}>{formatCurrency(stats?.totalStockValue ?? 0)}</Text>
          <Text style={styles.statLabel}>Valor do Estoque</Text>
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.actionButton} onPress={() => navigation.navigate('CreateProduct')}>
          <Text style={styles.actionButtonText}>+ Criar Novo Produto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionButton, styles.secondaryButton]} onPress={() => navigation.navigate('ListProducts')}>
          <Text style={[styles.actionButtonText, styles.secondaryButtonText]}>Ver Todos os Produtos</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.recentSection}>
        <Text style={styles.sectionTitle}>Adicionados Recentemente</Text>
        <FlatList
          data={recentProducts}
          keyExtractor={(item) => String(item.id_produto)}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={styles.productItem}>
              <Text style={styles.productName}>{item.nome}</Text>
              <Text style={styles.productStock}>Estoque: {item.estoque}</Text>
            </View>
          )}
          ListEmptyComponent={<Text>Nenhum produto recente.</Text>}
        />
      </View>
    </ScrollView>
  );
};

// Paste the beautiful styles here as well
const styles = StyleSheet.create({
  centerContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  container: { flex: 1, backgroundColor: '#f0f2f5' },
  header: { backgroundColor: '#6200ee', paddingHorizontal: 20, paddingTop: 40, paddingBottom: 50, borderBottomLeftRadius: 25, borderBottomRightRadius: 25 },
  headerTitle: { fontSize: 28, fontWeight: 'bold', color: '#fff' },
  headerSubtitle: { fontSize: 16, color: '#fff', opacity: 0.9, marginTop: 4 },
  statsContainer: { flexDirection: 'row', justifyContent: 'space-around', paddingHorizontal: 20, marginTop: -30 },
  statCard: { backgroundColor: '#fff', padding: 20, borderRadius: 12, width: '48%', alignItems: 'center', elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 5 },
  statValue: { fontSize: 22, fontWeight: 'bold', color: '#1e1e1e' },
  statLabel: { fontSize: 14, color: '#666', marginTop: 6 },
  actionsContainer: { marginTop: 30, paddingHorizontal: 20 },
  actionButton: { backgroundColor: '#6200ee', paddingVertical: 16, borderRadius: 12, alignItems: 'center', marginBottom: 15 },
  actionButtonText: { fontSize: 16, color: '#fff', fontWeight: 'bold' },
  secondaryButton: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#e0e0e0' },
  secondaryButtonText: { color: '#6200ee' },
  recentSection: { marginTop: 20, paddingHorizontal: 20, paddingBottom: 40 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 15 },
  productItem: { backgroundColor: '#fff', padding: 16, borderRadius: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10, borderWidth: 1, borderColor: '#f0f0f0' },
  productName: { fontSize: 16, color: '#444' },
  productStock: { fontSize: 14, color: '#888', fontWeight: '500' },
});

export default HomeScreen;