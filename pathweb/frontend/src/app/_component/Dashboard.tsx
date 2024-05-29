'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';
import { useRouter } from 'next/navigation';

interface Session {
  username: string;
}

const Dashboard = () => {
  const [session, setSession] = useState<Session | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axiosInstance.get('/auth/status');
        setSession(res.data);
      } catch (error) {
        console.error('Failed to fetch session:', error);
        alert('Session 유지 실패. 다시 로그인 해주세요.');
        router.push('/login');
      }
    };

    fetchSession();
  }, [router]);

  return (
    <div>
      <h1>Dashboard</h1>
      {session ? (
        <div>Welcome, {session.username}!</div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default Dashboard;
