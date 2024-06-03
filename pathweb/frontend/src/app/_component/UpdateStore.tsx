"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import styles from '../styles/UpdateStore.module.css';

const UpdateStore = () => {
  const { storeId } = useParams();
  const [store, setStore] = useState<any>(null);
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

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stores/${storeId}`);
        const storeData = response.data;
        setStore(storeData);
        setName(storeData.name);
        setType(storeData.type);
        setDetailType(storeData.detailtype);
        setLocation(storeData.location);
        setSeat(storeData.seat);
        setPrice(storeData.price);
        setOpenTime(storeData.opentime);
        setCloseTime(storeData.closedtime);
        setRating(storeData.rating);
        setDescription(storeData.description);
      } catch (error) {
        console.error('Error fetching store:', error);
        alert('Failed to fetch store');
      }
    };

    if (storeId) {
      fetchStore();
    }
  }, [storeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ownerId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!ownerId || !token) {
      alert('User not logged in');
      router.push('/login');
      return;
    }

    const updateData = {
      ownerId,
      name,
      type,
      detailtype: detailType,
      location,
      seat,
      price,
      opentime: openTime,
      closedtime: closeTime,
      rating,
      description
    };

    try {
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/stores/update/${storeId}`, updateData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      alert('Store updated successfully');
      router.push('/dashboard');
    } catch (error) {
      console.error('Error updating store:', error);
      alert('Failed to update store');
    }
  };

  const handleFileUpload = async () => {
    const token = localStorage.getItem('token');

    if (!file || !token) return;

    const formData = new FormData();
    formData.append('file', file);
    formData.append('userId', localStorage.getItem('userId')!);

    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/stores/upload/${storeId}`, formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Image uploaded successfully');
      setStore({ ...store, imageUrl: response.data.imageUrl });
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Failed to upload image');
    }
  };

  return (
    <div className={styles.updateStoreContainer}>
      <h1>Update Store</h1>
      {store ? (
        <form onSubmit={handleSubmit} className={styles.form}>
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
          <select value={type} onChange={(e) => setType(e.target.value)} required>
            <option value="음식점">음식점</option>
            <option value="카페">카페</option>
            <option value="놀이">놀이</option>
            <option value="술집">술집</option>
          </select>
          <select value={detailType} onChange={(e) => setDetailType(e.target.value)} required>
            <option value="한식">한식</option>
            <option value="디저트">디저트</option>
            <option value="보드게임">보드게임</option>
            <option value="포차">포차</option>
          </select>
          <select value={location} onChange={(e) => setLocation(e.target.value)} required>
            <option value="구정문">구정문</option>
            <option value="새정문">새정문</option>
            <option value="중문">중문</option>
          </select>
          <input type="text" placeholder="Seat" value={seat} onChange={(e) => setSeat(e.target.value)} required />
          <input type="text" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
          <input type="time" placeholder="Open Time" value={openTime} onChange={(e) => setOpenTime(e.target.value)} required />
          <input type="time" placeholder="Close Time" value={closeTime} onChange={(e) => setCloseTime(e.target.value)} required />
          <input type="text" placeholder="Rating" value={rating} onChange={(e) => setRating(e.target.value)} required />
          <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
          <input type="file" onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)} />
          <button type="submit">Update Store</button>
        </form>
      ) : (
        <div>Loading...</div>
      )}
      {file && (
        <button onClick={handleFileUpload} className={styles.uploadButton}>
          Upload Image
        </button>
      )}
    </div>
  );
};

export default UpdateStore;
