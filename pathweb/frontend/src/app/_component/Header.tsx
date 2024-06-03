'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/Header.module.css'; // CSS 모듈을 사용한 스타일링
import Image from 'next/image';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); // 로컬 스토리지에서 JWT 토큰을 가져옴
    setIsLoggedIn(!!token); // 토큰이 있으면 로그인 상태로 설정
  }, []);

  const handleDashboard = () => {
    router.push('/dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('token'); // 로그아웃 시 토큰 제거
    localStorage.removeItem('userId'); // 로그아웃 시 userId 제거
    localStorage.removeItem('username'); // 로그아웃 시 username 제거
    localStorage.removeItem('email'); // 로그아웃 시 email 제거
    localStorage.removeItem('role'); // 로그아웃 시 role 제거
    setIsLoggedIn(false); // 로그인 상태 변경
    router.push('/login'); // 로그인 페이지로 이동
  };

  const handleLogin = () => {
    router.push('/login');
  };

  const handleSignup = () => {
    router.push('/signup');
  };

  const handleBannerClick = () => {
    router.push('/');
  };

  return (
    <header className={styles.header}>
      <div className={styles.banner} onClick={handleBannerClick}>
        <Image src="/images/Header.png" alt="Banner" width={800} height={200} className={styles.bannerImage} />
        <h1>MyApp</h1>
      </div>
      <nav className={styles.nav}>
        {isLoggedIn ? (
          <>
            <button onClick={handleDashboard} className={styles.navButton}>Dashboard</button>
            <button onClick={handleLogout} className={styles.navButton}>Logout</button>
          </>
        ) : (
          <>
            <button onClick={handleLogin} className={styles.navButton}>Login</button>
            <button onClick={handleSignup} className={styles.navButton}>Signup</button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
