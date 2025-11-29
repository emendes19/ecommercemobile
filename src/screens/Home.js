import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/ProductService';

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]); // Apenas produtos da API Externa
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => navigation.navigate('Cart')}
        >
          {/* Apenas o Botão para Visualizar Carrinho */}
          <Text style={{ color: 'white', fontSize: 24 }}>Carrinho</Text> 
        </TouchableOpacity>
      ),
    });
    // Opcional: Se quiser remover o botão do carrinho, remova o useLayoutEffect
  }, [navigation]);

  useEffect(() => {
    // Apenas a lógica de busca da API externa
    const loadApiProducts = async () => {
      setLoading(true);
      const data = await fetchProducts();
      
      if (data.length === 0) {
        setError(true); 
      } else {
        setProducts(data);
        setError(false);
      }
      setLoading(false);
    };

    loadApiProducts();

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
      <Text style={styles.header}>Ofertas do Dia</Text>
      <FlatList
        data={products} // Apenas produtos da API
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