// src/services/firebaseConfig.js (ALTERADO)

import * as firebase from 'firebase/app';
// Adicionar doc, deleteDoc e serverTimestamp
import { getFirestore, collection, addDoc, serverTimestamp, doc, deleteDoc, query } from 'firebase/firestore'; 

// 1. Configuração do seu Projeto Firebase
const firebaseConfig = {
  // ... suas credenciais reais ...
  apiKey: "SUA_CHAVE_API_AQUI", 
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_ID_DO_PROJETO",
  storageBucket: "SEU_BUCKET.appspot.com",
  messagingSenderId: "SEU_ID_MESSAGING",
  appId: "SEU_ID_DO_APP"
};

// ... (Restante da inicialização) ...
let app;
if (!firebase.getApps().length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.getApp();
}

export const db = getFirestore(app);

// ----------------------------------------------------
// NOVO: Função para Adicionar Produto à Loja
// ----------------------------------------------------
export const addProduct = async (productData) => {
  try {
    const produtosRef = collection(db, 'produtos');
    
    // Adiciona o produto com um timestamp de criação
    await addDoc(produtosRef, {
      ...productData,
      createdAt: serverTimestamp(),
    });

    console.log(`Novo produto adicionado: ${productData.title}`);
    return true;
  } catch (error) {
    console.error("Erro ao adicionar novo produto: ", error);
    return false;
  }
};

// ----------------------------------------------------
// EXISTENTE: Funções do Carrinho
// ----------------------------------------------------
export const addToCart = async (productData) => {
  // ... (código da função existente) ...
};

export const removeFromCart = async (itemId) => {
  // ... (código da função existente) ...
};