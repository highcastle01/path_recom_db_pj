'use client';

import { useEffect, useState } from 'react';
import axiosInstance from '../../utils/axiosInstance';

interface User {
  username: string;
  // 추가적인 사용자 정보 필드
}

export default function UserInfo() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const res = await axiosInstance.get('/auth/me');
        setUser(res.data);
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <div>
      <h1>안녕하세요 {user ? user.username :'사용자'}님</h1>
      <p>여기는 로그인된 사용자의 정보를 표시하는 페이지입니다.</p>
      <p>{user?.username}</p>
      {/* 추가적인 사용자 정보를 여기에 표시할 수 있습니다. */}
    </div>
  );
}
