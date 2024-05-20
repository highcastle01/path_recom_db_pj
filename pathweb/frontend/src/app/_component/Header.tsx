import Image from 'next/image';
import styles from '../styles/Header.module.css';

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.banner}>
                <Image src="/images/Header.png" alt="Banner" width={1200} height={300} />
            </div>
        </header>
    );
}