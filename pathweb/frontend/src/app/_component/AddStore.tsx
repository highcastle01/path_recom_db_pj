"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from '../styles/UpdateStore.module.css';

const AddStore = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [detailType, setDetailType] = useState('');
  const [location, setLocation] = useState('');
  const [seat, setSeat] = useState('');
  const [price, setPrice] = useState('');
  const [openTime, setOpenTime] = useState('');
  const [closeTime, setCloseTime] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      alert('User not logged in');
      router.push('/login');
      return;
    }

    const formData = new FormData();
    formData.append('owner', userId);
    formData.append('name', name);
    formData.append('type', type);
    formData.append('detailtype', detailType);
    formData.append('location', location);
    formData.append('seat', seat);
    formData.append('price', price);
    formData.append('opentime', openTime);
    formData.append('closedtime', closeTime);
    formData.append('rating', rating);
    formData.append('description', description);
    if (file) {
      formData.append('file', file);
    }

    try {
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/stores/create`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Store added successfully');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error adding store:', error);
      alert('Failed to add store');
    }
  };

  return (
    <div className={styles.updateStoreContainer}>
      <h1>Add Store</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
        <input type="text" placeholder="Type" value={type} onChange={(e) => setType(e.target.value)} required />
        <input type="text" placeholder="Detail Type" value={detailType} onChange={(e) => setDetailType(e.target.value)} required />
        <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
        <input type="text" placeholder="Seat" value={seat} onChange={(e) => setSeat(e.target.value)} required />
        <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
        <input type="text" placeholder="Open Time" value={openTime} onChange={(e) => setOpenTime(e.target.value)} required />
        <input type="text" placeholder="Close Time" value={closeTime} onChange={(e) => setCloseTime(e.target.value)} required />
        <input type="text" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} required />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
        <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
        <button type="submit">Add Store</button>
      </form>
    </div>
  );
};

export default AddStore;
