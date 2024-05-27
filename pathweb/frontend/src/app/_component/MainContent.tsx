// src/app/_components/MainContent.tsx
"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/MainContent.module.css';

export default function MainContent() {
    const [people, setPeople] = useState<string>('');
    const [type1, setType1] = useState<string>('음식점');
    const [type2, setType2] = useState<string>('카페');
    const [type3, setType3] = useState<string>('놀이');
    const [location1, setLocation1] = useState<string>('구정문');
    const [location2, setLocation2] = useState<string>('신정문');
    const [location3, setLocation3] = useState<string>('사대부고');
    const [location4, setLocation4] = useState<string>('기타');
    const [priceMin, setPriceMin] = useState<string>('8000');
    const [priceMax, setPriceMax] = useState<string>('15000');
    const [startTime, setStartTime] = useState<string>('11:00');
    const [endTime, setEndTime] = useState<string>('20:00');
    const [detailType1, setDetailType1] = useState<string>('국밥');
    const [detailType2, setDetailType2] = useState<string>('');
    const [detailType3, setDetailType3] = useState<string>('');
    const router = useRouter();

    const handleSearch = () => {
        const query = {
            people,
            type1,
            type2,
            type3,
            startTime: startTime.replace(':', ''),
            endTime: endTime.replace(':', ''),
            priceMin,
            priceMax,
            detailType1,
            detailType2,
            detailType3,
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
                      <input
                        value={people}
                        onChange={(e) => setPeople(e.target.value)}
                        className={styles.dropdown}
                      />
                  </div>
                  <div className={styles.option}>
                      <label>목적 1</label>
                      <select
                        value={type1}
                        onChange={(e) => setType1(e.target.value)}
                        className={styles.dropdown}
                      >
                          <option value="음식점">음식점</option>
                          <option value="카페">카페</option>
                          <option value="스터디">스터디</option>
                          <option value="놀이">놀이</option>
                          <option value="">선택 안함</option>
                      </select>
                  </div>
                  <div className={styles.option}>
                      <label>목적 2</label>
                      <select
                        value={type2}
                        onChange={(e) => setType2(e.target.value)}
                        className={styles.dropdown}
                      >
                          <option value="음식점">음식점</option>
                          <option value="카페">카페</option>
                          <option value="스터디">스터디</option>
                          <option value="놀이">놀이</option>
                          <option value="">선택 안함</option>
                      </select>
                  </div>
                  <div className={styles.option}>
                      <label>목적 3</label>
                      <select
                        value={type3}
                        onChange={(e) => setType3(e.target.value)}
                        className={styles.dropdown}
                      >
                          <option value="음식점">음식점</option>
                          <option value="카페">카페</option>
                          <option value="스터디">스터디</option>
                          <option value="놀이">놀이</option>
                          <option value="">선택 안함</option>
                      </select>
                  </div>
                  <div className={styles.option}>
                      <label>장소 1</label>
                      <select
                        value={location1}
                        onChange={(e) => setLocation1(e.target.value)}
                        className={styles.dropdown}
                      >
                          <option value="구정문">구정문</option>
                          <option value="신정문">신정문</option>
                          <option value="사대부고">사대부고</option>
                          <option value="기타">기타</option>
                          <option value="">선택 안함</option>
                      </select>
                  </div>
                  <div className={styles.option}>
                      <label>장소 2</label>
                      <select
                        value={location2}
                        onChange={(e) => setLocation2(e.target.value)}
                        className={styles.dropdown}
                      >
                          <option value="구정문">구정문</option>
                          <option value="신정문">신정문</option>
                          <option value="사대부고">사대부고</option>
                          <option value="기타">기타</option>
                          <option value="">선택 안함</option>
                      </select>
                  </div>
                  <div className={styles.option}>
                      <label>장소 3</label>
                      <select
                        value={location3}
                        onChange={(e) => setLocation3(e.target.value)}
                        className={styles.dropdown}
                      >
                          <option value="구정문">구정문</option>
                          <option value="신정문">신정문</option>
                          <option value="사대부고">사대부고</option>
                          <option value="기타">기타</option>
                          <option value="">선택 안함</option>
                      </select>
                  </div>
                  <div className={styles.option}>
                      <label>장소 4</label>
                      <select
                        value={location4}
                        onChange={(e) => setLocation4(e.target.value)}
                        className={styles.dropdown}
                      >
                          <option value="구정문">구정문</option>
                          <option value="신정문">신정문</option>
                          <option value="사대부고">사대부고</option>
                          <option value="기타">기타</option>
                          <option value="">선택 안함</option>
                      </select>
                  </div>
                  <div className={styles.option}>
                      <label>가격 최소</label>
                      <input
                        type="number"
                        value={priceMin}
                        onChange={(e) => setPriceMin(e.target.value)}
                        className={styles.input}
                      />
                  </div>
                  <div className={styles.option}>
                      <label>가격 최대</label>
                      <input
                        type="number"
                        value={priceMax}
                        onChange={(e) => setPriceMax(e.target.value)}
                        className={styles.input}
                      />
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
                  <div className={styles.option}>
                      <label>세부 유형 1</label>
                      <select
                        value={detailType1}
                        onChange={(e) => setDetailType1(e.target.value)}
                        className={styles.input}
                      >
                          <option value="국밥">국밥</option>
                          <option value="이자카야">이자카야</option>
                          <option value="보드게임">보드게임</option>
                          <option value="포차">포차</option>
                          <option value="">선택 안함</option>
                      </select>
                  </div>
                  <div className={styles.option}>
                      <label>세부 유형 2</label>
                      <select
                        value={detailType2}
                        onChange={(e) => setDetailType2(e.target.value)}
                        className={styles.input}
                      >
                          <option value="국밥">국밥</option>
                          <option value="이자카야">이자카야</option>
                          <option value="보드게임">보드게임</option>
                          <option value="포차">포차</option>
                          <option value="">선택 안함</option>
                      </select>
                  </div>
                  <div className={styles.option}>
                      <label>세부 유형 3</label>
                      <select
                        value={detailType3}
                        onChange={(e) => setDetailType3(e.target.value)}
                        className={styles.input}
                      >
                          <option value="국밥">국밥</option>
                          <option value="이자카야">이자카야</option>
                          <option value="보드게임">보드게임</option>
                          <option value="포차">포차</option>
                          <option value="">선택 안함</option>
                      </select>
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
