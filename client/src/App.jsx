import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import PostListView from './pages/PostListView';
import SinglePostView from './pages/SinglePostView';
import PostForm from './pages/PostForm';
import Login from './pages/Login'; // 👈 move this import up here

const App = () => (
  <Router>
    <Navbar />
    <Routes>
      <Route path="/" element={<PostListView />} />
      <Route path="/posts/:id" element={<SinglePostView />} />
      <Route path="/create" element={<PostForm />} />
      <Route path="/edit/:id" element={<PostForm />} />
      <Route path="/login" element={<Login />} /> {/* 👈 integrated here */}
    </Routes>
  </Router>
);

export default App;