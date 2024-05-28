"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [ratings, setRatings] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:3000/users/profile', { withCredentials: true });
      if (response.status === 200) {
        setUser(response.data);
        fetchRatings(response.data.id);
      } else {
        router.push('/login');
      }
    } catch (error) {
      console.error('Error fetching user:', error);
      router.push('/login');
    }
  };

  const fetchRatings = async (userId: number) => {
    try {
      const response = await axios.get(`http://localhost:3000/ratings/user/${userId}`);
      if (response.status === 200) {
        setRatings(response.data);
      } else {
        console.error('Failed to fetch ratings');
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Welcome, {user.username}!</h1>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <h2>Your Ratings</h2>
      {ratings.length > 0 ? (
        <ul>
          {ratings.map(rating => (
            <li key={rating.id}>
              Score: {rating.score}, Comment: {rating.comment}
            </li>
          ))}
        </ul>
      ) : (
        <p>You have not rated any shops yet.</p>
      )}
    </div>
  );
};

export default Dashboard;
