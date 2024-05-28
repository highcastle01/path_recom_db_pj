"use client";

import { useRouter } from 'next/navigation';

const Success = () => {
  const router = useRouter();

  return (
    <div>
      <h1>회원가입이 성공적으로 완료되었습니다!</h1>
      <button onClick={() => router.push('/login')}>로그인 페이지로 이동</button>
    </div>
  );
};

export default Success;
