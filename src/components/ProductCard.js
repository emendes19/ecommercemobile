// src/components/ProductCard.js
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width / 2 - 16; 

const ProductCard = ({ product, onPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      {/* Imagem do produto */}
      <Image
        style={styles.image}
        source={{ uri: product.image }}
        resizeMode="contain"
      />
      <View style={styles.info}>
        <Text style={styles.title} numberOfLines={2}>
          {product.title}
        </Text>
        <Text style={styles.price}>
          R$ {product.price ? product.price.toFixed(2) : 'N/A'}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

// Uso de Dimensions e flexbox para Responsividade de Rotação de Tela
const styles = StyleSheet.create({
  card: {
    width: CARD_WIDTH,
    margin: 4,
    backgroundColor: '#fff',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 120,
    backgroundColor: '#eee',
  },
  info: {
    padding: 10,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#00a651',
    marginTop: 5,
  },
});

export default ProductCard;