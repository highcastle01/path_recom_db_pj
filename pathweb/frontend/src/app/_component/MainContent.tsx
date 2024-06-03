"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from '../styles/MainContent.module.css';

export default function MainContent() {
    const [people, setPeople] = useState<string>('');
    const [isRestaurantChecked, setIsRestaurantChecked] = useState<boolean>(false);
    const [isCafeChecked, setIsCafeChecked] = useState<boolean>(false);
    const [isActivityChecked, setIsActivityChecked] = useState<boolean>(false);
    const [isBarChecked, setIsBarChecked] = useState<boolean>(false);
    const [type1, setType1] = useState<string>('음식점');
    const [type2, setType2] = useState<string>('카페');
    const [type3, setType3] = useState<string>('놀이');
    const [type4, setType4] = useState<string>('술집');
    const [location1, setLocation1] = useState<string>('구정문');
    const [location2, setLocation2] = useState<string>('구정문');
    const [location3, setLocation3] = useState<string>('구정문');
    const [location4, setLocation4] = useState<string>('구정문');
    const [price, setPrice] = useState<string>('1만원대 이하');
    const [startTime, setStartTime] = useState<string>('11:00');
    const [endTime, setEndTime] = useState<string>('20:00');
    const [detailType1, setDetailType1] = useState<string>('한식');
    const [detailType2, setDetailType2] = useState<string>('디저트');
    const [detailType3, setDetailType3] = useState<string>('보드게임');
    const [detailType4, setDetailType4] = useState<string>('포차');
    const router = useRouter();

    const priceMap: { [key: string]: number } = {
        '1만원대 이하': 10000,
        '1만원대': 20000,
        '2만원대': 30000,
        '3만원대': 40000,
        '4만원대': 50000,
        '4만원대 이상': Infinity,
    };

    const handleSearch = () => {
        const priceMax = priceMap[price];
        if (!priceMax && priceMax !== 0) {
            console.error(`Price range "${price}" not found in priceMap`);
            return;
        }
        const query: { [key: string]: string } = {
            people,
            startTime: startTime.replace(':', ''),
            endTime: endTime.replace(':', ''),
            price: priceMax.toString(),
        };

        if (isRestaurantChecked) {
            query.type1 = type1;
            query.detailType1 = detailType1;
            query.location1 = location1;
        }

        if (isCafeChecked) {
            query.type2 = type2;
            query.detailType2 = detailType2;
            query.location2 = location2;
        }

        if (isActivityChecked) {
            query.type3 = type3;
            query.detailType3 = detailType3;
            query.location3 = location3;
        }

        if (isBarChecked) {
            query.type4 = type4;
            query.detailType4 = detailType4;
            query.location4 = location4;
        }

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
                        className={styles.input}
                      />
                  </div>
                  <div className={styles.option}>
                      <label>
                          <input
                            type="checkbox"
                            checked={isRestaurantChecked}
                            onChange={(e) => setIsRestaurantChecked(e.target.checked)}
                          />
                          음식점
                      </label>
                  </div>
                  {isRestaurantChecked && (
                    <>
                        <div className={styles.option}>
                            <label>음식점 유형</label>
                            <select
                              value={detailType1}
                              onChange={(e) => setDetailType1(e.target.value)}
                              className={styles.input}
                            >
                                <option value="한식">한식</option>
                                <option value="양식">양식</option>
                                <option value="중식">중식</option>
                                <option value="일식">일식</option>
                                <option value="치킨">치킨</option>
                                <option value="패스트푸드">패스트푸드</option>
                                <option value="">선택 안함</option>
                            </select>
                        </div>
                        <div className={styles.option}>
                            <label>음식점 장소</label>
                            <select
                              value={location1}
                              onChange={(e) => setLocation1(e.target.value)}
                              className={styles.dropdown}
                            >
                                <option value="구정문">구정문</option>
                                <option value="신정문">신정문</option>
                                <option value="사대부고">사대부고</option>
                                <option value="">선택 안함</option>
                            </select>
                        </div>
                    </>
                  )}
                  <div className={styles.option}>
                      <label>
                          <input
                            type="checkbox"
                            checked={isCafeChecked}
                            onChange={(e) => setIsCafeChecked(e.target.checked)}
                          />
                          카페
                      </label>
                  </div>
                  {isCafeChecked && (
                    <>
                        <div className={styles.option}>
                            <label>카페 유형</label>
                            <select
                              value={detailType2}
                              onChange={(e) => setDetailType2(e.target.value)}
                              className={styles.input}
                            >
                                <option value="디저트">디저트</option>
                                <option value="스터디">스터디</option>
                                <option value="">선택 안함</option>
                            </select>
                        </div>
                        <div className={styles.option}>
                            <label>카페 장소</label>
                            <select
                              value={location2}
                              onChange={(e) => setLocation2(e.target.value)}
                              className={styles.dropdown}
                            >
                                <option value="구정문">구정문</option>
                                <option value="신정문">신정문</option>
                                <option value="사대부고">사대부고</option>
                                <option value="">선택 안함</option>
                            </select>
                        </div>
                    </>
                  )}
                  <div className={styles.option}>
                      <label>
                          <input
                            type="checkbox"
                            checked={isActivityChecked}
                            onChange={(e) => setIsActivityChecked(e.target.checked)}
                          />
                          놀이
                      </label>
                  </div>
                  {isActivityChecked && (
                    <>
                        <div className={styles.option}>
                            <label>놀이 유형</label>
                            <select
                              value={detailType3}
                              onChange={(e) => setDetailType3(e.target.value)}
                              className={styles.input}
                            >
                                <option value="보드게임">보드게임</option>
                                <option value="포켓볼">포켓볼</option>
                                <option value="볼링">볼링</option>
                                <option value="노래방">노래방</option>
                                <option value="PC방">PC방</option>
                                <option value="게임방">게임방</option>
                                <option value="">선택 안함</option>
                            </select>
                        </div>
                        <div className={styles.option}>
                            <label>놀이 장소</label>
                            <select
                              value={location3}
                              onChange={(e) => setLocation3(e.target.value)}
                              className={styles.dropdown}
                            >
                                <option value="구정문">구정문</option>
                                <option value="신정문">신정문</option>
                                <option value="사대부고">사대부고</option>
                                <option value="">선택 안함</option>
                            </select>
                        </div>
                    </>
                  )}
                  <div className={styles.option}>
                      <label>
                          <input
                            type="checkbox"
                            checked={isBarChecked }
                            onChange={(e) => setIsBarChecked(e.target.checked)}
                          />
                          술집
                      </label>
                  </div>
                  {isBarChecked && (
                    <>
                        <div className={styles.option}>
                            <label>술집 유형</label>
                            <select
                              value={detailType4}
                              onChange={(e) => setDetailType4(e.target.value)}
                              className={styles.input}
                            >
                                <option value="포차">포차</option>
                                <option value="이자카야">이자카야</option>
                                <option value="바">바</option>
                                <option value="">선택 안함</option>
                            </select>
                        </div>
                        <div className={styles.option}>
                            <label>술집 장소</label>
                            <select
                              value={location3}
                              onChange={(e) => setLocation3(e.target.value)}
                              className={styles.dropdown}
                            >
                                <option value="구정문">구정문</option>
                                <option value="신정문">신정문</option>
                                <option value="사대부고">사대부고</option>
                                <option value="">선택 안함</option>
                            </select>
                        </div>
                    </>
                  )}
                  <div className={styles.option}>
                      <label>가격</label>
                      <select
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className={styles.dropdown}
                      >
                          <option value="1만원대 이하">1만원대 이하</option>
                          <option value="1만원대">1만원대</option>
                          <option value="2만원대">2만원대</option>
                          <option value="3만원대">3만원대</option>
                          <option value="4만원대">4만원대</option>
                          <option value="4만원대 이상">4만원대 이상</option>
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
