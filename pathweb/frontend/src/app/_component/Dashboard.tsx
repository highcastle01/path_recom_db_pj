'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import styles from '../styles/Dashboard.module.css'; // CSS 모듈을 사용한 스타일링

interface UserInfo {
  userId: string;
  username: string;
  email: string;
  role: string;
}

interface Store {
  id: number;
  name: string;
  owner: {
    id: number;
  };
}

const Dashboard = () => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [stores, setStores] = useState<Store[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('token'); // 로컬 스토리지에서 JWT 토큰을 가져옴
        if (!token) {
          throw new Error('No token found');
        }

        const userId = localStorage.getItem('userId');
        const username = localStorage.getItem('username');
        const email = localStorage.getItem('email');
        const role = localStorage.getItem('role');

        if (!userId || !username || !email || !role) {
          throw new Error('User information is missing');
        }

        setUserInfo({ userId, username, email, role });

        // Fetch stores
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/stores/owner/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setStores(response.data);

      } catch (error) {
        console.error('Failed to fetch user info:', error);
        alert('Failed to fetch user info: ' + error);
        router.push('/login');
      }
    };

    fetchUserInfo();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token'); // 로그아웃 시 토큰 제거
    localStorage.removeItem('userId'); // 로그아웃 시 userId 제거
    localStorage.removeItem('username'); // 로그아웃 시 username 제거
    localStorage.removeItem('email'); // 로그아웃 시 email 제거
    localStorage.removeItem('role'); // 로그아웃 시 role 제거
    router.push('/login'); // 로그인 페이지로 이동
  };

  const handleAddStore = () => {
    router.push('/addstore');
  };

  const handleEditStore = (storeId: number) => {
    router.push(`/updatestore/${storeId}`);
  };

  return (
    <div className={styles.dashboardContainer}>
      <h1>Dashboard</h1>
      {userInfo ? (
        <div className={styles.userInfo}>
          <p>안녕하세요, {userInfo.username}님!</p>
          <p>Email: {userInfo.email}</p>
          <p>정보: {userInfo.role}</p>
          <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
          <button onClick={handleAddStore} className={styles.addButton}>Add Store</button>
          {stores.length > 0 ? (
            <div className={styles.storesList}>
              <h2>Your Stores</h2>
              <ul>
                {stores.map(store => (
                  <li key={store.id}>
                    {store.name} <button onClick={() => handleEditStore(store.id)}>Edit</button>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No stores found</p>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Dashboard;
