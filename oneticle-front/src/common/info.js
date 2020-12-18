const jobInfo = {
  jobList: ['스타트업 창업', '기획', '디자인', '개발'],
  jobDetailList: {
    '스타트업 창업': ['CEO'],
    기획: ['광고/마케팅', '운영'],
    디자인: [
      '공예',
      '그래픽 디자인',
      'UX/UI',
      '영상/모션그래픽',
      '브랜딩/편집',
      '산업 디자인',
      '포토그래피',
    ],
    개발: ['프론트앤드', '백앤드', '데이터/인공지능'],
  },
  jobToEn: {
    디자인: 'design',
    개발: 'develop',
    기획: 'plan',
    '스타트업 창업': 'ceo',
  },
};

const levelInfo = {
  getLevelNum: level => {
    const levelNum =
      level <= 1350 // 작은 새싹
        ? parseInt((level + 149) / 300) + 1
        : level <= 4350 // 큰 새싹
        ? parseInt((level - 1351) / 600) + 6
        : level <= 8850 // 작은 나무
        ? parseInt((level - 4351) / 900) + 11
        : Math.min(parseInt((level - 8851) / 1200) + 16, 25); // 큰 나무
    return levelNum;
  },
  getLevelInfo: level => {
    const titleAndPoint =
      level <= 1500
        ? ['작은 새싹', 300]
        : level <= 4350
        ? ['큰 새싹', 600]
        : level <= 8850
        ? ['작은 나무', 900]
        : ['큰 나무', 1200];
    return { levelTitle: titleAndPoint[0], needPoint: titleAndPoint[1] };
  },
  getCharSrc: (job, levelTitle) => {
    console.log(job, levelTitle);
    if (job === '디자인') {
      return levelTitle === '작은 새싹'
        ? 'https://media.vlpt.us/images/moseok/post/87b44534-0384-40ff-90cf-1daf9054e85c/%EC%9E%90%EC%82%B0%2022@2x.png'
        : levelTitle === '큰 새싹'
        ? 'https://media.vlpt.us/images/moseok/post/d5d0debc-f9c2-41ef-91ff-2d122c48d2ca/%EC%9E%90%EC%82%B0%2023@2x.png'
        : levelTitle === '작은 나무'
        ? 'https://media.vlpt.us/images/moseok/post/84467a44-1bab-4085-b870-150cad27ebc7/%EC%9E%90%EC%82%B0%2024@2x.png'
        : 'https://media.vlpt.us/images/moseok/post/a4703118-30b9-4fd7-836d-22ee2adecd98/%EC%9E%90%EC%82%B0%2018@2x.png';
    } else if (job === '개발') {
      return levelTitle === '작은 새싹'
        ? 'https://media.vlpt.us/images/moseok/post/be1feae1-cf20-429e-ade7-3fc943542713/%EC%9E%90%EC%82%B0%2025@2x.png'
        : levelTitle === '큰 새싹'
        ? 'https://media.vlpt.us/images/moseok/post/68331b40-ef37-41de-bd7c-7a6150a24c86/%EC%9E%90%EC%82%B0%2026@2x.png'
        : levelTitle === '작은 나무'
        ? 'https://media.vlpt.us/images/moseok/post/cfda19c0-d022-4c6d-94e3-47bd377d731f/%EC%9E%90%EC%82%B0%2027@2x.png'
        : 'https://media.vlpt.us/images/moseok/post/60d255ab-ff98-4548-8d33-0c1dc706b1bb/%EC%9E%90%EC%82%B0%2033@2x.png';
    } else if (job === '기획') {
      return levelTitle === '작은 새싹'
        ? 'https://media.vlpt.us/images/moseok/post/3802d63d-bc06-46e6-8721-9ac520098b74/%EC%9E%90%EC%82%B0%2040@2x.png'
        : levelTitle === '큰 새싹'
        ? 'https://media.vlpt.us/images/moseok/post/0384fdc9-6ee3-4e9b-93ea-4edff4758403/%EC%9E%90%EC%82%B0%2041@2x.png'
        : levelTitle === '작은 나무'
        ? 'https://media.vlpt.us/images/moseok/post/f1bb15f7-94d7-4d4a-8729-c73fe289a234/%EC%9E%90%EC%82%B0%2042@2x.png'
        : 'https://media.vlpt.us/images/moseok/post/addb95d3-ba77-438d-8765-ef6af3b4046a/%EC%9E%90%EC%82%B0%2043@2x.png';
    } else {
      return levelTitle === '작은 새싹'
        ? 'https://media.vlpt.us/images/moseok/post/f11f7d45-aef0-47c3-9ea6-64ef2068bc82/%EC%9E%90%EC%82%B0%2044@2x.png'
        : levelTitle === '큰 새싹'
        ? 'https://media.vlpt.us/images/moseok/post/a54e6f00-547b-48dd-b527-3e46eb3cc1b5/%EC%9E%90%EC%82%B0%2045@2x.png'
        : levelTitle === '작은 나무'
        ? 'https://media.vlpt.us/images/moseok/post/b3afff38-2f25-4e14-a86f-07f574507baf/%EC%9E%90%EC%82%B0%2046@2x.png'
        : 'https://media.vlpt.us/images/moseok/post/20624981-79f2-4012-925e-30aea789bd75/%EC%9E%90%EC%82%B0%2047@2x.png';
    }
  },
  levelTable: {
    1: 0,
    2: 151,
    3: 451,
    4: 751,
    5: 1051,
    6: 1351,
    7: 1951,
    8: 2551,
    9: 3151,
    10: 3751,
    11: 4351,
    12: 5251,
    13: 6151,
    14: 7051,
    15: 7951,
    16: 8851,
    17: 10051,
    18: 11251,
    19: 12451,
    20: 13651,
    21: 14851,
    22: 16051,
    23: 17251,
    24: 18451,
    25: 19651,
    26: 20851,
  },
};

export { levelInfo, jobInfo };
