import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  title: yup.string().required('Title is required'),
  content: yup.string(),
  category: yup.string()
});

const PostForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    if (isEditing) {
      axios
        .get(`${import.meta.env.VITE_API_BASE_URL}/posts/${id}`)
        .then(res => reset(res.data))
        .catch(err => console.error(err));
    }
  }, [id, reset]);

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('content', data.content);
      formData.append('category', data.category);
      if (image) formData.append('image', image);

      const method = isEditing ? 'put' : 'post';
      const url = isEditing
        ? `${import.meta.env.VITE_API_BASE_URL}/posts/${id}`
        : `${import.meta.env.VITE_API_BASE_URL}/posts`;

      await axios[method](url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      navigate('/');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <input placeholder="Title" {...register('title')} />
      {errors.title && <p>{errors.title.message}</p>}

      <textarea placeholder="Content" {...register('content')} />

      <input placeholder="Category" {...register('category')} />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
      />

      {image && (
        <img
          src={URL.createObjectURL(image)}
          alt="Preview"
          width="200"
          style={{ marginTop: '1rem', borderRadius: '6px' }}
        />
      )}

      <button type="submit">{isEditing ? 'Update' : 'Create'} Post</button>
    </form>
  );
};

export default PostForm;