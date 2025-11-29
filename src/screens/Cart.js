import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
// Importação do Firebase
import { db, removeFromCart } from '../services/firebaseConfig'; // <-- Importado removeFromCart
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'carrinho'), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const items = [];
      querySnapshot.forEach((doc) => {
        // Mapeia o ID do documento como 'id' no objeto
        items.push({ id: doc.id, ...doc.data() }); 
      });
      setCartItems(items);
      setLoading(false);
    }, (error) => {
      console.error("Erro ao ler o carrinho:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleDeleteItem = (itemId, itemName) => {
    Alert.alert(
      "Confirmar Remoção",
      `Tem certeza que deseja remover "${itemName}" do carrinho?`,
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        { 
          text: "Remover", 
          onPress: async () => {
            const success = await removeFromCart(itemId);
            if (success) {
                
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#00a651" />
        <Text>Carregando carrinho...</Text>
      </View>
    );
  }

  const renderItem = ({ item }) => (
    <View style={styles.itemCard}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.name}</Text>
        <Text style={styles.itemPrice}>R$ {item.price ? item.price.toFixed(2) : 'N/A'}</Text>
      </View>
      {/* Botão de Exclusão */}
      <TouchableOpacity 
        style={styles.deleteButton}
        // Chamada da função com o ID do documento
        onPress={() => handleDeleteItem(item.id, item.name)} 
      >
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Seu Carrinho ({cartItems.length} itens)</Text>
      {cartItems.length === 0 ? (
        <Text style={styles.emptyText}>Seu carrinho está vazio!</Text>
      ) : (
        <FlatList
          data={cartItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    padding: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 4,
    marginHorizontal: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between', // Ajustado para separar botão
    alignItems: 'center',
  },
  itemInfo: { // Novo container para o texto, para não colidir com o botão
    flex: 1,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 16,
    flexShrink: 1,
  },
  itemPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#00a651',
    marginTop: 5,
  },
  deleteButton: {
    backgroundColor: '#ff3333',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 16,
    color: '#888',
  }
});

export default Cart;