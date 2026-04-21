
import api from "./api";


export async function login(username, password) {
  try {
    const response = await api.post("/auth/login", {
      username: username,
      password: password,
    });
    return { data: response.data, success: true };
  } catch (error) {
    return { data: null, success: false, errorMessage: "Usuário ou senha inválidos" };
  }
}


export async function getProducts() {
  try {
    const response = await api.get("/products");
    return { data: response.data, success: true };
  } catch (error) {
    return { data: null, success: false, errorMessage: "Erro ao buscar produtos" };
  }
}


export async function getProductsByCategory(category) {
  try {
    const response = await api.get(`/products/category/${category}`);
    return { data: response.data, success: true };
  } catch (error) {
    return { data: null, success: false, errorMessage: "Erro ao buscar categoria" };
  }
}


export async function getCategories() {
  try {
    const response = await api.get("/products/categories");
    return { data: response.data, success: true };
  } catch (error) {
    return { data: [], success: false };
  }
}


export async function getProductById(id) {
  try {
    const response = await api.get(`/products/${id}`);
    return { data: response.data, success: true };
  } catch (error) {
    return { data: null, success: false, errorMessage: "Erro ao buscar detalhes" };
  }
}