import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { deletePost } from '../api/api'; // Optional: use centralized API service

const PostListView = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5; // Number of posts per page

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/posts?page=${currentPage}&limit=${limit}`)
      .then(res => {
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
      })
      .catch(err => console.error(err));
  }, [currentPage]);

  const handleDelete = async (id) => {
    setPosts(prev => prev.filter(post => post._id !== id));
    try {
      await deletePost(id); // or axios.delete(...)
    } catch (err) {
      console.error('Delete failed:', err);
      // Optional: re-fetch or display message
    }
  };

  return (
    <div>
      <h2>All Posts</h2>
      <ul>
        {posts.map(post => (
          <li key={post._id}>
            <Link to={`/posts/${post._id}`}>{post.title}</Link>
            <button onClick={() => handleDelete(post._id)}>🗑 Delete</button>
          </li>
        ))}
      </ul>

      <div style={{ marginTop: '1rem' }}>
        <button
          onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
          disabled={currentPage === 1}
        >
          ← Prev
        </button>

        <span style={{ margin: '0 1rem' }}>
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
          disabled={currentPage === totalPages}
        >
          Next →
        </button>
      </div>
    </div>
  );
};

export default PostListView;