const API_URL = 'https://fakestoreapi.com';

export const fetchProducts = async () => {
  try {
    // Processamento Assíncrono e API
    const response = await fetch(`${API_URL}/products`);

    // Tratamento de Erro
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("ERRO ao buscar produtos:", error.message);
    return [];
  }
};

export const fetchProductById = async (id) => {
  try {
    const response = await fetch(`${API_URL}/products/${id}`);
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`ERRO ao buscar produto ${id}:`, error.message);
    return null;
  }
};