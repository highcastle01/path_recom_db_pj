'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import styles from '../styles/Footer.module.css';

export default function Footer() {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = ['/images/광고1.png', '/images/광고2.png', '/images/광고3.png'];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000); // 3초마다 이미지 변경

        return () => clearInterval(interval);
    }, [images.length]);

    return (
        <footer className={styles.footer}>
            <a href="https://www.jbnu.ac.kr/kor/" target="_blank" rel="noopener noreferrer">
                <Image src={images[currentImageIndex]} alt="광고 배너" width={500} height={100} />
            </a>
        </footer>
    );
}
