// src/screens/Home.js (ALTERADO)

import React, { useState, useEffect, useLayoutEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/ProductService';
// Importações para buscar produtos do Firebase em tempo real
import { db } from '../services/firebaseConfig';
// Importação da escuta e ordenação
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore'; 

const Home = ({ navigation }) => {
  const [products, setProducts] = useState([]); // Produtos da API Externa
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [firebaseProducts, setFirebaseProducts] = useState([]); // Produtos Criados pelo Usuário

  // Configura os botões do cabeçalho
  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ flexDirection: 'row' }}>
          {/* Botão para Adicionar Novo Produto */}
          <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={() => navigation.navigate('AddProduct')} // <-- NOVO BOTÃO
          >
            <Text style={{ color: 'white', fontSize: 24 }}>➕</Text> 
          </TouchableOpacity>
          {/* Botão para Visualizar Carrinho */}
          <TouchableOpacity
            style={{ marginRight: 15 }}
            onPress={() => navigation.navigate('Cart')}
          >
            <Text style={{ color: 'white', fontSize: 24 }}>🛒</Text> 
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    // 1. Busca produtos da API externa
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

    // 2. Ouve os produtos criados pelo usuário no Firebase (em tempo real)
    // Ouve a coleção 'produtos' e ordena por 'createdAt' para aparecerem primeiro
    const q = query(collection(db, 'produtos'), orderBy('createdAt', 'desc')); 
    
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const items = [];
        querySnapshot.forEach((doc) => {
            // Mapeia os dados, forçando o ID para string
            items.push({ id: doc.id, ...doc.data(), isFirebase: true });
        });
        setFirebaseProducts(items);
    }, (err) => {
        console.error("Erro ao ler produtos do Firebase: ", err);
    });

    loadApiProducts();

    // 3. Cleanup: Garante que a escuta do Firebase pare ao sair
    return () => unsubscribe();
  }, []);

  // Combina os produtos do Firebase (que aparecem primeiro) com os da API
  const combinedProducts = [...firebaseProducts, ...products];

  if (loading && firebaseProducts.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00a651" />
        <Text style={styles.loadingText}>Carregando Produtos...</Text>
      </View>
    );
  }

  if (error && combinedProducts.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>
          ❌ Falha ao carregar dados. Verifique a API e o Firebase.
        </Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <ProductCard
      product={item}
      onPress={() => navigation.navigate('DetalheProduto', { productId: item.id, isFirebase: item.isFirebase })}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>✨ Ofertas do Dia</Text>
      <FlatList
        data={combinedProducts}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
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