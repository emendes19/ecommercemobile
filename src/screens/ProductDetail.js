// src/screens/ProductDetail.js

import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { fetchProductById } from '../services/ProductService';
// Importação do serviço de banco de dados
import { addToCart } from '../services/firebaseConfig';

const ProductDetail = ({ route }) => {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      const data = await fetchProductById(productId);
      setProduct(data);
      setLoading(false);
    };

    loadProduct();
  }, [productId]);
  
  // Função para adicionar ao DB
  const handleAddToCart = async () => {
    if (product) {
      const success = await addToCart(product);
      if (success) {
        Alert.alert("Sucesso!", `${product.title.substring(0, 30)}... adicionado ao carrinho (Firebase)!`);
      } else {
        // Tratamento de Erro para a operação de DB
        Alert.alert("Erro", "Não foi possível adicionar ao banco de dados. Verifique a configuração do Firebase.");
      }
    }
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00a651" />
      </View>
    );
  }

  if (!product) {
    return (
      <View style={styles.center}>
        <Text>Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Image
        style={styles.image}
        source={{ uri: product.image }}
        resizeMode="contain"
      />
      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>R$ {product.price ? product.price.toFixed(2) : 'N/A'}</Text>
        
        {/* Botão de Ação - Integração com Banco de Dados */}
        <TouchableOpacity style={styles.buyButton} onPress={handleAddToCart}>
          <Text style={styles.buyButtonText}>🛒 Adicionar ao Carrinho (DB)</Text>
        </TouchableOpacity>
        
        <View style={styles.descriptionSection}>
          <Text style={styles.descriptionHeader}>Descrição do Produto</Text>
          {/* Requisito: Descrição dos produtos */}
          <Text style={styles.description}>{product.description}</Text>
        </View>
        
        <Text style={styles.category}>Categoria: {product.category}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    backgroundColor: '#eee',
  },
  details: {
    padding: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  price: {
    fontSize: 28,
    fontWeight: '900',
    color: '#00a651',
    marginBottom: 20,
  },
  buyButton: {
    backgroundColor: '#ff6600', 
    padding: 15,
    borderRadius: 8,
    marginVertical: 10,
    alignItems: 'center',
  },
  buyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  descriptionSection: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 15,
    marginTop: 10,
  },
  descriptionHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  description: {
    fontSize: 16,
    color: '#555',
    lineHeight: 24,
  },
  category: {
    fontSize: 14,
    color: '#888',
    marginTop: 15,
  }
});

export default ProductDetail;