'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';
import styles from '../styles/StoreInfo.module.css';

interface Store {
  id: number;
  name: string;
  type: string;
  detailtype: string;
  location: string;
  seat: string;
  price: string;
  opentime: number;
  closedtime: number;
  description: string;
  imageUrl: string;
}

const StoreInfo = () => {
  const { storeId } = useParams();
  const [store, setStore] = useState<Store | null>(null);

  useEffect(() => {
    const fetchStore = async () => {
      try {
        if (storeId) {
          const response = await axios.get<Store>(`${process.env.NEXT_PUBLIC_API_URL}/stores/${storeId}`);
          setStore(response.data);
        }
      } catch (error) {
        console.error('Error fetching store:', error);
      }
    };

    fetchStore();
  }, [storeId]);

  if (!store) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.storeInfoContainer}>
      <div className={styles.banner}>
        <img src={store.imageUrl} alt={store.name} className={styles.bannerImage} />
      </div>
      <div className={styles.storeHeader}>
        <h1>{store.name}</h1>
        <p className={styles.storeType}>{store.type}</p>
        <p className={styles.storeLocation}>{store.location}</p>
      </div>
      <div className={styles.storeDetails}>
        <div className={styles.storeDescription}>
          <h2>소개</h2>
          <p>{store.description}</p>
        </div>
        <div className={styles.storeInfo}>
          <p><strong>Type:</strong> {store.type}</p>
          <p><strong>Detail Type:</strong> {store.detailtype}</p>
          <p><strong>Seat:</strong> {store.seat}</p>
          <p><strong>Price:</strong> {store.price}</p>
          <p><strong>Open Time:</strong> {store.opentime}</p>
          <p><strong>Close Time:</strong> {store.closedtime}</p>
        </div>
      </div>
    </div>
  );
};

export default StoreInfo;