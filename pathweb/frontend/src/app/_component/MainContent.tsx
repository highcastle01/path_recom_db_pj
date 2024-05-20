"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/MainContent.module.css';

export default function MainContent() {
    const [personCount, setPersonCount] = useState<string>('1명');
    const [purpose, setPurpose] = useState<string>('스터디');
    const [price, setPrice] = useState<string>('7000원 - 8000원');
    const [startTime, setStartTime] = useState<string>('18:00');
    const [endTime, setEndTime] = useState<string>('24:00');
    const router = useRouter();

    const handleSearch = () => {
        const query = {
            personCount,
            purpose,
            price,
            startTime,
            endTime,
        };
        const queryString = new URLSearchParams(query as any).toString();
        router.push(`/results?${queryString}`);
    };

    return (
        <main className={styles.main}>
            <div className={styles.searchSection}>
                <div className={styles.searchOptions}>
                    <div className={styles.option}>
                        <label>인원</label>
                        <select
                            value={personCount}
                            onChange={(e) => setPersonCount(e.target.value)}
                            className={styles.dropdown}
                        >
                            <option value="1명">1명</option>
                            <option value="2명">2명</option>
                            <option value="3명">3명</option>
                            <option value="4명">4명</option>
                        </select>
                    </div>
                    <div className={styles.option}>
                        <label>목적</label>
                        <select
                            value={purpose}
                            onChange={(e) => setPurpose(e.target.value)}
                            className={styles.dropdown}
                        >
                            <option value="스터디">스터디</option>
                            <option value="식사">식사</option>
                            <option value="카페">카페</option>
                        </select>
                    </div>
                    <div className={styles.option}>
                        <label>가격</label>
                        <select
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className={styles.dropdown}
                        >
                            <option value="7000원 - 8000원">7000원 - 8000원</option>
                            <option value="8000원 - 10000원">8000원 - 10000원</option>
                            <option value="10000원 이상">10000원 이상</option>
                        </select>
                    </div>
                    <div className={styles.option}>
                        <label>시간</label>
                        <div className={styles.timeInputContainer}>
                            <input
                                type="time"
                                value={startTime}
                                onChange={(e) => setStartTime(e.target.value)}
                                className={styles.timeInput}
                            />
                            <span> - </span>
                            <input
                                type="time"
                                value={endTime}
                                onChange={(e) => setEndTime(e.target.value)}
                                className={styles.timeInput}
                            />
                        </div>
                    </div>
                    <div className={styles.buttonGroup}>
                        <button onClick={handleSearch} className={styles.searchButton}>
                            검색하기
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
}
