'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useRouter } from 'next/navigation';

interface UserInfo {
  username: string;
  email: string;
  role: string;
}

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token'); // 로컬 스토리지에서 JWT 토큰을 가져옴
        console.log('Token from localStorage:', token);
        if (!token) {
          throw new Error('No token found');
        }

        const res = await axiosInstance.get('/auth/status', {
          headers: {
            Authorization: `Bearer ${token}` // 요청 헤더에 JWT 토큰을 포함
          }
        });
        console.log('User info response:', res.data);
        setUserInfo(res.data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
        alert('Failed to fetch user info. Please log in again.');
        router.push('/login');
      }
    };

    fetchUserInfo();
  }, [router]);

  return (
    <div>
      <h1>Dashboard</h1>
      {userInfo ? (
        <div>
          <p>Welcome, {userInfo.username}!</p>
          <p>Email: {userInfo.email}</p>
          <p>Role: {userInfo.role}</p>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Dashboard;
