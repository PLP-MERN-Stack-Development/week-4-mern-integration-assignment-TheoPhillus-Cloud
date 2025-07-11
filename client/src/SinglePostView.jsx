import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SinglePostView = () => {
  const { id: postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/posts/${postId}`)
      .then(res => setPost(res.data))
      .catch(err => console.error(err));
  }, [postId]);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/comments`)
      .then(res => setComments(res.data))
      .catch(console.error);
  }, [postId]);

  const submitComment = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/comments`, {
        content: commentText,
        author: 'Guest' // Use AuthContext if available
      });
      setCommentText('');
      const updated = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/posts/${postId}/comments`);
      setComments(updated.data);
    } catch (err) {
      console.error('Failed to submit comment:', err);
    }
  };

  if (!post) return <p>Loading...</p>;

  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.content}</p>
      <small>Category: {post.category?.name}</small>

      <hr />

      <h3>Comments</h3>
      <ul>
        {comments.map(c => (
          <li key={c._id}>
            <strong>{c.author}:</strong> {c.content}
          </li>
        ))}
      </ul>

      <textarea
        value={commentText}
        onChange={(e) => setCommentText(e.target.value)}
        placeholder="Add a comment"
        rows={3}
        style={{ width: '100%', marginTop: '1rem' }}
      />
      <button onClick={submitComment} style={{ marginTop: '0.5rem' }}>
        Submit
      </button>
    </div>
  );
};

export default SinglePostView;