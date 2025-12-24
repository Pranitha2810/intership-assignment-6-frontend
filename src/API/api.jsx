import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL;
console.log(API_BASE);

// axios instance
const api = axios.create({
  baseURL: API_BASE,
});

// 🔐 Automatically attach JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---------------- AUTH ----------------
export const registerUser = async (data) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUser = async (data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

// ---------------- PRODUCTS ----------------
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


