import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getPosts = () => axios.get(`${API_BASE}/posts`);
export const getPost = (id) => axios.get(`${API_BASE}/posts/${id}`);
export const createPost = (data) => axios.post(`${API_BASE}/posts`, data);
export const updatePost = (id, data) => axios.put(`${API_BASE}/posts/${id}`, data);
export const deletePost = (id) => axios.delete(`${API_BASE}/posts/${id}`);

export const getCategories = () => axios.get(`${API_BASE}/categories`);
export const createCategory = (data) => axios.post(`${API_BASE}/categories`, data);