import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, password] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, { email, password });
    login(res.data.token);
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" value={email} onChange={(e) => email = e.target.value} />
      <input type="password" value={password} onChange={(e) => password = e.target.value} />
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;