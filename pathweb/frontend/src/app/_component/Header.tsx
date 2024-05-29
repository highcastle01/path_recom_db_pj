'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import styles from '../styles/Header.module.css';
import { useRouter } from 'next/navigation';

interface Session {
  username?: string;
}

export default function Header() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      try {
        const res = await axios.post('http://localhost:3000/auth/status', {}, { withCredentials: true });
        setSession(res.data);
      } catch (error) {
        console.error('Failed to fetch session', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSession();
  }, []);

  const handleSignOut = async () => {
    try {
      await axios.post('http://localhost:3000/auth/logout', {}, { withCredentials: true });
      setSession(null);
      router.push('/login');
    } catch (error) {
      console.error('Sign out failed', error);
    }
  };

  const handleBannerClick = () => {
    router.push('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.banner} onClick={handleBannerClick}>
        <Image src="/images/Header.png" alt="Banner" width={1200} height={300} />
        {session && session.username && (
          <div className={styles.username}>
            <span>{session.username}</span>
          </div>
        )}
      </div>
      <div className={styles.userStatus}>
        {!loading && (
          session && session.username ? (
            <div>
              <span>Welcome, {session.username}</span>
              <button onClick={() => router.push('/dashboard')}>Dashboard</button>
              <button onClick={handleSignOut}>Logout</button>
            </div>
          ) : (
            <div>
              <a href="/login">Login</a> | <a href="/signup">Sign Up</a>
            </div>
          )
        )}
      </div>
    </header>
  );
}
