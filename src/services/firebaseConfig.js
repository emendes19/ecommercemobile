import * as firebase from 'firebase/app';
import { getFirestore, collection, addDoc, serverTimestamp, doc, deleteDoc } from 'firebase/firestore'; 

const firebaseConfig = {
  // ... credenciais reais ...
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

export const addToCart = async (productData) => {
  try {
    const carrinhoRef = collection(db, 'carrinho');
    
    // Adiciona o documento
    await addDoc(carrinhoRef, {
      productId: productData.id,
      name: productData.title,
      price: productData.price,
      // Usando serverTimestamp para registro do tempo
      timestamp: serverTimestamp(),
    });

    console.log(`Produto ${productData.id} adicionado ao Firestore!`);
    return true;
  } catch (error) {
    console.error("Erro ao adicionar no Firestore: ", error);
    return false;
  }
};

export const removeFromCart = async (itemId) => {
  try {
    const docRef = doc(db, 'carrinho', itemId);
    await deleteDoc(docRef);

    console.log(`Produto ${itemId} removido do Firestore!`);
    return true;
  } catch (error) {
    console.error("Erro ao remover do Firestore: ", error);
    alert("Erro: Não foi possível remover o item do carrinho. Verifique as permissões (Regras de Segurança).");
    return false;
  }
};