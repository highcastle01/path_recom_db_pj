'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.clear(); // 로컬 스토리지의 모든 항목을 제거
    alert('You have been logged out. All local storage data has been cleared.');
    router.push('/login'); // 로그인 페이지로 리디렉션
  }, [router]);

  return null;
};

export default Logout;
