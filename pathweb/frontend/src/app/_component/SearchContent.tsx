// src/app/_components/SearchContent.tsx
"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import styles from '../styles/SearchContent.module.css';

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

const SearchContent = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const query = {
          people: searchParams.get('people'),
          type1: searchParams.get('type1'),
          type2: searchParams.get('type2'),
          type3: searchParams.get('type3'),
          location1: searchParams.get('location1'),
          location2: searchParams.get('location2'),
          location3: searchParams.get('location3'),
          startTime: searchParams.get('startTime'),
          endTime: searchParams.get('endTime'),
          priceMin: searchParams.get('priceMin'),
          priceMax: searchParams.get('priceMax'),
          detailType1: searchParams.get('detailType1'),
          detailType2: searchParams.get('detailType2'),
          detailType3: searchParams.get('detailType3'),
        };

        const response = await axios.get<Store[]>(`${process.env.NEXT_PUBLIC_API_URL}/stores/search`, {
          params: query
        });
        console.log(response.data);
        setStores(response.data);
      } catch (error) {
        console.error('Error fetching stores:', error);
      }
    };

    fetchStores();
  }, [searchParams]);

  const groupedStores = stores.reduce((acc: any, store) => {
    if (store.type === searchParams.get('type1')) {
      acc.type1.push(store);
    } else if (store.type === searchParams.get('type2')) {
      acc.type2.push(store);
    } else if (store.type === searchParams.get('type3')) {
      acc.type3.push(store);
    }
    return acc;
  }, { type1: [], type2: [], type3: [] });

  return (
    <div>
      <h1>Search Results</h1>
      {searchParams.get('type1') && (
        <div className={styles.typeSection}>
          <h2>{searchParams.get('type1')}</h2>
          <ul>
            {groupedStores.type1.map((store: Store) => (
              <li key={store.id} className={styles.storeItem}>
                <h3>{store.name}</h3>
                <p>{store.detailtype}</p>
                <p>{store.location}</p>
                <p>{store.seat}</p>
                <p>{store.price}</p>
                <p>{store.opentime} - {store.closedtime}</p>
                <p>{store.description}</p>
                {store.imageUrl ? (
                  <img src={`${process.env.NEXT_PUBLIC_API_URL}${store.imageUrl}`} alt={store.name} className={styles.storeImage} />
                ) : (
                  <p>No image available</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {searchParams.get('type2') && (
        <div className={styles.typeSection}>
          <h2>{searchParams.get('type2')}</h2>
          <ul>
            {groupedStores.type2.map((store: Store) => (
              <li key={store.id} className={styles.storeItem}>
                <h3>{store.name}</h3>
                <p>{store.detailtype}</p>
                <p>{store.location}</p>
                <p>{store.seat}</p>
                <p>{store.price}</p>
                <p>{store.opentime} - {store.closedtime}</p>
                <p>{store.description}</p>
                {store.imageUrl ? (
                  <img src={`${process.env.NEXT_PUBLIC_API_URL}${store.imageUrl}`} alt={store.name} className={styles.storeImage} />
                ) : (
                  <p>No image available</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
      {searchParams.get('type3') && (
        <div className={styles.typeSection}>
          <h2>{searchParams.get('type3')}</h2>
          <ul>
            {groupedStores.type3.map((store: Store) => (
              <li key={store.id} className={styles.storeItem}>
                <h3>{store.name}</h3>
                <p>{store.detailtype}</p>
                <p>{store.location}</p>
                <p>{store.seat}</p>
                <p>{store.price}</p>
                <p>{store.opentime} - {store.closedtime}</p>
                <p>{store.description}</p>
                {store.imageUrl ? (
                  <img src={`${process.env.NEXT_PUBLIC_API_URL}${store.imageUrl}`} alt={store.name} className={styles.storeImage} />
                ) : (
                  <p>No image available</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchContent;
