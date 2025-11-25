// src/screens/Home.js

import React, { useState, useEffect, useLayoutEffect } from 'react'; // <-- Importado useLayoutEffect
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'; // <-- Importado TouchableOpacity
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/ProductService';

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Configura o botão do carrinho no cabeçalho
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate('Cart')} // Navega para a tela 'Cart'
        >
          {/* Botão de Navegação para o Carrinho */}
          <Text style={{ color: 'white', fontSize: 24 }}>🛒</Text> 
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const loadProducts = async () => {
      // Processamento Assíncrono
      setLoading(true);
      const data = await fetchProducts();
      
      if (data.length === 0) {
        // Tratamento de Erro
        setError(true); 
      } else {
        setProducts(data);
        setError(false);
      }
      setLoading(false);
    };

    loadProducts();
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00a651" />
        <Text style={styles.loadingText}>Carregando Produtos...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          ❌ Falha ao carregar dados. Verifique a API.
        </Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('DetalheProduto', { productId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>✨ Ofertas do Dia</Text>
      {/* FlatList para Lazy Loading */}
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 8,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginVertical: 10,
    marginLeft: 8,
    color: '#333',
  },
  list: {
    paddingBottom: 10,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    color: '#555',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
});

export default Home;