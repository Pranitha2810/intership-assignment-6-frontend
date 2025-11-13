import axios from 'axios';

const api = axios.create({
    baseURL : "https://dummyjson.com"
});

export const fetchProducts = async()=>{
    const res = await api.get("/products");
    return res.data.products;
}

export const createProduct = async (data)=>{
    const res = await api.post("products/add",data);
    return res.data;
}