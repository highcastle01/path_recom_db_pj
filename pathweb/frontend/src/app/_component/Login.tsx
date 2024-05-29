'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../utils/axiosInstance';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log('Submitting login form with:', { username, password });
      const res = await axiosInstance.post('/auth/login', {
        username,
        password,
      });
      console.log('Response received:', res);
      if (res.status === 200) {
        const { access_token } = res.data;
        localStorage.setItem('token', access_token); // JWT 토큰을 로컬 스토리지에 저장
        router.push('/dashboard');
      } else {
        console.error('Login failed with status:', res.status);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <button type="submit">Login</button>
    </form>
  );
}
