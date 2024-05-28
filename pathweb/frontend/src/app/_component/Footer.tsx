"use client"; // 파일 상단에 추가

import { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from '../styles/Footer.module.css';

export default function Footer() {
    const images = [
        '/images/광고1.png',
        '/images/광고2.png',
        '/images/광고3.png'
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // 3초마다 이미지 변경

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <footer className={styles.footer}>
            <div className={styles.adContainer}>
                <a href="http://www.jbnu.ac.kr/kor/" target="_blank" rel="noopener noreferrer">
                    <Image
                        src={images[currentImageIndex]}
                        alt="Advertisement Banner"
                        layout="responsive" // 반응형 레이아웃 사용
                        width={800} // 디자인에 따라 너비 조정
                        height={100} // 높이를 줄여서 조정
                    />
                </a>
            </div>
        </footer>
    );
}
