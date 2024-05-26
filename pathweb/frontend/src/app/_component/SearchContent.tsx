// src/app/_components/SearchContent.tsx
"use client";

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';

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

  return (
    <div>
      <ul>
        {stores.map(store => (
          <li key={store.id}>
            <h2>{store.name}</h2>
            <p>{store.type}</p>
            <p>{store.detailtype}</p>
            <p>{store.location}</p>
            <p>{store.seat}</p>
            <p>{store.price}</p>
            <p>{store.opentime} - {store.closedtime}</p>
            <p>{store.description}</p>
            {store.imageUrl ? (
              <img src={`${process.env.NEXT_PUBLIC_API_URL}${store.imageUrl}`} alt={store.name} width="200" />
            ) : (
              <p>No image available</p>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchContent;
