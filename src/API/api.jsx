import axios from 'axios';

const api = axios.create({
  baseURL: "http://localhost:8081",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

export const fetchProducts = async () => {
  const token = localStorage.getItem("token");
  if (!token) return [];

  const res = await api.get("/products");
  return res.data;
};

export const createProduct = async (data) => {
  const res = await api.post("/products/add", data);
  return res.data;
};


