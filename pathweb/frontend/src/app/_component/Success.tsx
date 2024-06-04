'use client';

import { useRouter } from 'next/navigation';
import styles from '../styles/Success.module.css'; 

const Success = () => {
  const router = useRouter();

  return (
    <div className={styles.successContainer}>
      <h1 className={styles.successMessage}>회원가입이 성공적으로 완료되었습니다!</h1>
      <button onClick={() => router.push('/login')} className={styles.successButton}>
        로그인 페이지로 이동
      </button>
    </div>
  );
};

export default Success;
