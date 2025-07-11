// CategoryContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_BASE_URL}/categories`)
         .then(res => setCategories(res.data))
         .catch(console.error);
  }, []);

  return (
    <CategoryContext.Provider value={categories}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);