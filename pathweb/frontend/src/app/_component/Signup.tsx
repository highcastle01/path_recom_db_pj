'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('customer');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:3000/auth/signup', {
        username,
        password,
        name,
        email,
        role,
      });
      if (res.status === 201) {
        router.push('/login');
      }
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
      <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
      <select value={role} onChange={(e) => setRole(e.target.value)} required>
        <option value="customer">Customer</option>
        <option value="admin">Admin</option>
        <option value="store_owner">Store Owner</option>
      </select>
      <button type="submit">Sign Up</button>
    </form>
  );
}
