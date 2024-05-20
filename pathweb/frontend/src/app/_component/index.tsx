import Head from 'next/head';
import styles from '../Home.module.css';

export default function Home() {
    return (
        <div className={styles.container}>
            <Head>
                <title>My Next.js Website</title>
    <meta name="description" content="Generated by create next app" />
    <link rel="icon" href="/favicon.ico" />
        </Head>

        <header className={styles.header}>
    <img src="/images/sample.png" alt="Sample" />
    <div className={styles.profile}>
        <span>Profile / Logout</span>
        </div>
        </header>

        <main className={styles.main}>
    <form className={styles.form}>
    <div className={styles['form-group']}>
    <label htmlFor="people">인원:</label>
        <select id="people" name="people">
            <option value="4">1명</option>
            <option value="4">2명</option>
            <option value="4">3명</option>
            <option value="4">4명</option>
        </select>
    </div>
        <div className={styles['form-group']}>
    <label htmlFor="purpose">목적:</label>
            <select id="purpose" name="purpose">
                <option value="study">친목</option>
                <option value="study">스터디</option>
            </select>
        </div>
        <div className={styles['form-group']}>
    <label htmlFor="price">가격:</label>
    <input type="text" id="price" name="price" placeholder="7000원 - 8000원" />
        </div>
        <div className={styles['form-group']}>
    <label htmlFor="type">성향:</label>
    <input type="text" id="type" name="type" placeholder="E(외향적): 3명, I(내향적): 1명" />
        </div>
        <div className={styles['form-group']}>
    <button type="button">옵션을 추가하세요.</button>
    </div>
    <div className={styles['form-group']}>
    <button type="submit">검색하기</button>
        </div>
        </form>

        <div className={styles.results}>
    <div className={styles['result-card']}>
    <img src="/images/sample.png" alt="디찜" />
        <h2>디찜</h2>
        <p>카페, 디저트</p>
    <p>쾌적한 스터디 진행에 좋습니다.</p>
    <p>상태: 쾌적</p>
    </div>
    <div className={styles['result-card']}>
    <img src="/images/sample.png" alt="명륜" />
        <h2>명륜</h2>
        <p>카페, 디저트</p>
    <p>상점이유: 디저트 맛있고 공간도 넓어서 공부하기 좋음</p>
    <p>상태: 쾌적</p>
    </div>
    </div>
    <button type="button">더보기</button>
        </main>

        <footer className={styles.footer}>
        <p>여기가 되게 좋고...</p>
    <p>조용히해 이여풍이 더 정확해</p>
    </footer>
    </div>
);
}
