// src/services/firebaseConfig.js (Código Completo Atualizado)

import * as firebase from 'firebase/app';
// IMPORTANTE: Adicionar deleteDoc
import { getFirestore, collection, addDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore'; 

// 1. Configuração do seu Projeto Firebase
const firebaseConfig = {
  // ... suas credenciais reais ...
  apiKey: "SUA_CHAVE_API_AQUI",
  authDomain: "SEU_DOMINIO.firebaseapp.com",
  projectId: "SEU_ID_DO_PROJETO",
  // ...
};

// ... (Restante da inicialização) ...
let app;
if (!firebase.getApps().length) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.getApp();
}

export const db = getFirestore(app);

// ... (Função addToCart existente) ...

/**
 * Remove um produto da coleção 'carrinho' no Firestore.
 * @param {string} itemId O ID do documento a ser excluído.
 */
export const removeFromCart = async (itemId) => {
  try {
    // 1. Cria a referência ao documento usando o ID
    const docRef = doc(db, 'carrinho', itemId);

    // 2. Exclui o documento
    await deleteDoc(docRef);

    console.log(`Produto ${itemId} removido do Firestore!`);
    return true;
  } catch (error) {
    console.error("Erro ao remover do Firestore: ", error);
    // Tratamento de Erro
    alert("Erro: Não foi possível remover o item do carrinho. Verifique as permissões (Regras de Segurança).");
    return false;
  }
};