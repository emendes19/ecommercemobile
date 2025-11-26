// src/navigation/AppNavigator.js (ALTERADO)

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import ProductDetail from '../screens/ProductDetail';
import Cart from '../screens/Cart';
import AddProduct from '../screens/AddProduct'; // <-- NOVO IMPORT

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#00a651',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ title: '📱 Minha Loja Simples' }} />
      <Stack.Screen name="DetalheProduto" component={ProductDetail} options={{ title: 'Detalhes do Produto' }} />
      <Stack.Screen name="Cart" component={Cart} options={{ title: 'Seu Carrinho' }} />
      {/* NOVO REGISTRO DA TELA */}
      <Stack.Screen name="AddProduct" component={AddProduct} options={{ title: 'Adicionar Produto' }} />
    </Stack.Navigator>
  );
};

export default AppNavigator;