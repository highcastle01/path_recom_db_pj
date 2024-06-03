'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
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
          location4: searchParams.get('location4'),
          startTime: searchParams.get('startTime'),
          endTime: searchParams.get('endTime'),
          price: searchParams.get('price'),
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
      {['type1', 'type2', 'type3'].map((type, index) => (
        searchParams.get(type) && groupedStores[type].length > 0 && (
          <div key={index} className={styles.typeSection}>
            <h2>{searchParams.get(type)}</h2>
            <div className={styles.storeGrid}>
              {groupedStores[type].slice(0, 14).map((store: Store) => (
                <Link key={store.id} href={`/storeinfo/${store.id}`} passHref>
                  <div className={styles.storeItem}>
                    <div className={styles.storeImageContainer}>
                      {store.imageUrl ? (
                        <>
                          <img src={`${store.imageUrl}`} alt={store.name} className={styles.storeImage} />
                        </>
                      ) : (
                        <p>No image available</p>
                      )}
                    </div>
                    <div className={styles.storeInfo}>
                      <h3>{store.name}</h3>
                      <p><strong>세부타입:</strong> {store.detailtype}</p>
                      <p><strong>위치:</strong> {store.location}</p>
                      <p><strong>좌석수:</strong> {store.seat}</p>
                      <p><strong>가격:</strong> {store.price}</p>
                      <p><strong>영업시간:</strong> {store.opentime} - {store.closedtime}</p>
                      <p><strong>설명:</strong> {store.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
              {Array.from({ length: Math.max(0, 14 - groupedStores[type].length) }).map((_, i) => (
                <div key={`empty-${i}`} className={`${styles.storeItem} ${styles.emptyStoreItem}`}></div>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default SearchContent;
