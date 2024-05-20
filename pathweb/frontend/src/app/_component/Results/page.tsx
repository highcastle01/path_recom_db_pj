"use client";

import { useSearchParams } from 'next/navigation';
import styles from '../../styles/Results.module.css';

export default function Results() {
    const searchParams = useSearchParams();
    const personCount = searchParams.get('personCount');
    const purpose = searchParams.get('purpose');
    const price = searchParams.get('price');
    const startTime = searchParams.get('startTime');
    const endTime = searchParams.get('endTime');

    return (
        <div className={styles.resultsContainer}>
            <h1>검색 결과</h1>
            {personCount && <p>인원: {personCount}</p>}
            {purpose && <p>목적: {purpose}</p>}
            {price && <p>가격: {price}</p>}
            {startTime && endTime && <p>시간: {startTime} - {endTime}</p>}
            {/* 결과를 표시하는 로직을 여기에 추가합니다 */}
        </div>
    );
}
