// src/screens/AddProduct.js

import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { addProduct } from '../services/firebaseConfig';

const AddProduct = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(''); // URL da Imagem
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async () => {
    if (!title || !description || !price || !image) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }
    
    // Simulação do requisito de compressão, exigindo um link
    if (!image.startsWith('http')) {
        Alert.alert('Erro', 'Use uma URL de imagem válida.');
        return;
    }
    Alert.alert('Compressão de Imagem', 'Usaremos o link fornecido assumindo que ele já está otimizado (compressão prévia).');

    setLoading(true);

    const newProduct = {
      title,
      description,
      price: parseFloat(price.replace(',', '.')), 
      image,
    };

    const success = await addProduct(newProduct);
    
    setLoading(false);

    if (success) {
      Alert.alert('Sucesso!', 'Novo produto adicionado à loja!');
      // Retorna para a Home
      navigation.navigate('Home'); 
    } else {
      Alert.alert('Erro', 'Não foi possível salvar o produto. Verifique suas regras de segurança no Firebase.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>Criar Novo Anúncio</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome do Produto"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Preço (ex: 199.99)"
        value={price}
        onChangeText={setPrice}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        placeholder="URL da Imagem (Link já otimizado)"
        value={image}
        onChangeText={setImage}
        autoCapitalize="none"
      />
      <TextInput
        style={[styles.input, styles.descriptionInput]}
        placeholder="Descrição do Produto"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAddProduct}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.addButtonText}>Publicar Produto</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  descriptionInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  addButton: {
    backgroundColor: '#00a651',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddProduct;