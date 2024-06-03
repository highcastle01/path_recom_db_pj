'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axiosInstance from '../../utils/axiosInstance';
import styles from '../styles/Login.module.css';

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post('/auth/login', {
                username,
                password,
            });
            if (res.status === 200) {
                const { access_token, userId, username, email, role } = res.data;
                localStorage.setItem('token', access_token); // JWT 토큰을 로컬 스토리지에 저장
                localStorage.setItem('userId', userId); // userId를 로컬 스토리지에 저장
                localStorage.setItem('username', username); // username을 로컬 스토리지에 저장
                localStorage.setItem('email', email); // email을 로컬 스토리지에 저장
                localStorage.setItem('role', role); // role을 로컬 스토리지에 저장
                alert('Login successful. User info stored in localStorage.');
                router.push('/');
            } else {
                console.error('Login failed with status:', res.status);
            }
        } catch (error) {
            console.error('Login failed:', error);
            alert('Login failed: ' + error);
        }
    };

    return (
        <div className={styles.formContainer}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    className={styles.input}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Username"
                    required
                />
                <input
                    type="password"
                    className={styles.input}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    required
                />
                <button type="submit" className={styles.button}>
                    Login
                </button>
            </form>
        </div>
    );
}
