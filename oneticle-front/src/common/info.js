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
      level <= 1350
        ? ['작은 새싹', 300]
        : level <= 4350
        ? ['큰 새싹', 600]
        : level <= 8850
        ? ['작은 나무', 900]
        : ['큰 나무', 1200];
    return { levelTitle: titleAndPoint[0], needPoint: titleAndPoint[1] };
  },
  getCharSrc: (job, levelTitle) => {
    if (job === '디자인') {
      return levelTitle === '작은 새싹'
        ? [
            'https://media.vlpt.us/images/moseok/post/87b44534-0384-40ff-90cf-1daf9054e85c/%EC%9E%90%EC%82%B0%2022@2x.png',
            'https://media.vlpt.us/images/moseok/post/bd66cbb2-f15a-4c0b-a7d0-f66b976e002a/%EA%B7%B8%EB%A3%B9%20173@2x.png',
            'https://media.vlpt.us/images/moseok/post/aa4b9a8c-c990-47bf-8bf0-aa8d397fec79/%EA%B7%B8%EB%A3%B9%20192@2x.png',
          ]
        : levelTitle === '큰 새싹'
        ? [
            'https://media.vlpt.us/images/moseok/post/d5d0debc-f9c2-41ef-91ff-2d122c48d2ca/%EC%9E%90%EC%82%B0%2023@2x.png',
            'https://media.vlpt.us/images/moseok/post/8c4c86fd-b4b1-4ac8-a72f-20af2c3ea18c/%EA%B7%B8%EB%A3%B9%20174@2x.png',
            'https://media.vlpt.us/images/moseok/post/bfef3179-649c-4709-b6e6-b5175435a812/%EA%B7%B8%EB%A3%B9%20191@2x.png',
          ]
        : levelTitle === '작은 나무'
        ? [
            'https://media.vlpt.us/images/moseok/post/84467a44-1bab-4085-b870-150cad27ebc7/%EC%9E%90%EC%82%B0%2024@2x.png',
            'https://media.vlpt.us/images/moseok/post/1e00328c-608c-4a2a-bbb6-8f556cd0a7c6/%EA%B7%B8%EB%A3%B9%20175@2x.png',
            'https://media.vlpt.us/images/moseok/post/81017d9b-5b81-4384-8070-a4e81984c9d3/%EA%B7%B8%EB%A3%B9%20190@2x.png',
          ]
        : [
            'https://media.vlpt.us/images/moseok/post/a4703118-30b9-4fd7-836d-22ee2adecd98/%EC%9E%90%EC%82%B0%2018@2x.png',
            'https://media.vlpt.us/images/moseok/post/5334876d-04e4-45d4-b04b-5ecaf181ae06/%EA%B7%B8%EB%A3%B9%20176@2x.png',
            'https://media.vlpt.us/images/moseok/post/10c79f97-02d9-4665-9add-408ca0c40db2/%EA%B7%B8%EB%A3%B9%20189@2x.png',
          ];
    } else if (job === '개발') {
      return levelTitle === '작은 새싹'
        ? [
            'https://media.vlpt.us/images/moseok/post/be1feae1-cf20-429e-ade7-3fc943542713/%EC%9E%90%EC%82%B0%2025@2x.png',
            'https://media.vlpt.us/images/moseok/post/c0321213-c77d-4be8-a54a-1b298a500906/%EA%B7%B8%EB%A3%B9%20169@2x.png',
            'https://media.vlpt.us/images/moseok/post/13c81399-abab-4cd0-9d82-b155fe3613d5/%EA%B7%B8%EB%A3%B9%20185@2x.png',
          ]
        : levelTitle === '큰 새싹'
        ? [
            'https://media.vlpt.us/images/moseok/post/68331b40-ef37-41de-bd7c-7a6150a24c86/%EC%9E%90%EC%82%B0%2026@2x.png',
            'https://media.vlpt.us/images/moseok/post/2be4924b-bb90-4c74-aea5-0d3e3e7bce90/%EA%B7%B8%EB%A3%B9%20170@2x.png',
            'https://media.vlpt.us/images/moseok/post/793a9788-543c-4457-a739-a2dfc320c7eb/%EA%B7%B8%EB%A3%B9%20186@2x.png',
          ]
        : levelTitle === '작은 나무'
        ? [
            'https://media.vlpt.us/images/moseok/post/cfda19c0-d022-4c6d-94e3-47bd377d731f/%EC%9E%90%EC%82%B0%2027@2x.png',
            'https://media.vlpt.us/images/moseok/post/ec9cb484-7e92-4faa-add9-b2ebddb3e372/%EA%B7%B8%EB%A3%B9%20171@2x.png',
            'https://media.vlpt.us/images/moseok/post/a739866d-0785-4ff2-99f8-b62ed302f3e6/%EA%B7%B8%EB%A3%B9%20187@2x.png',
          ]
        : [
            'https://media.vlpt.us/images/moseok/post/60d255ab-ff98-4548-8d33-0c1dc706b1bb/%EC%9E%90%EC%82%B0%2033@2x.png',
            'https://media.vlpt.us/images/moseok/post/d5cdec9b-1d35-4294-80c6-5278fdb53c3e/%EA%B7%B8%EB%A3%B9%20172@2x.png',
            'https://media.vlpt.us/images/moseok/post/32f40d07-06f0-413a-bef7-0b6e07b0d3f5/%EA%B7%B8%EB%A3%B9%20188@2x.png',
          ];
    } else if (job === '기획') {
      return levelTitle === '작은 새싹'
        ? [
            'https://media.vlpt.us/images/moseok/post/3802d63d-bc06-46e6-8721-9ac520098b74/%EC%9E%90%EC%82%B0%2040@2x.png',
            'https://media.vlpt.us/images/moseok/post/8375e8df-0136-4d03-be76-769c31db1079/%EA%B7%B8%EB%A3%B9%20165@2x.png',
            'https://media.vlpt.us/images/moseok/post/fda080f5-8d7e-4fc2-9b1e-2a6a00a27ee7/%EA%B7%B8%EB%A3%B9%20184@2x.png',
          ]
        : levelTitle === '큰 새싹'
        ? [
            'https://media.vlpt.us/images/moseok/post/0384fdc9-6ee3-4e9b-93ea-4edff4758403/%EC%9E%90%EC%82%B0%2041@2x.png',
            'https://media.vlpt.us/images/moseok/post/422ba609-f3c8-4cfb-b863-27f0a3b50807/%EA%B7%B8%EB%A3%B9%20166@2x.png',
            'https://media.vlpt.us/images/moseok/post/5e4c9026-e351-41b8-a0e8-7344eb5ccf0d/%EA%B7%B8%EB%A3%B9%20183@2x.png',
          ]
        : levelTitle === '작은 나무'
        ? [
            'https://media.vlpt.us/images/moseok/post/f1bb15f7-94d7-4d4a-8729-c73fe289a234/%EC%9E%90%EC%82%B0%2042@2x.png',
            'https://media.vlpt.us/images/moseok/post/69314d45-7cf9-437c-9f69-3dbec5f52f9d/%EA%B7%B8%EB%A3%B9%20167@2x.png',
            'https://media.vlpt.us/images/moseok/post/7ccfc247-5a30-4190-8b25-cf9cdb6ff89f/%EA%B7%B8%EB%A3%B9%20182@2x.png',
          ]
        : [
            'https://media.vlpt.us/images/moseok/post/addb95d3-ba77-438d-8765-ef6af3b4046a/%EC%9E%90%EC%82%B0%2043@2x.png',
            'https://media.vlpt.us/images/moseok/post/d510c5a7-3062-4d76-a6a6-410385dcc0fc/%EA%B7%B8%EB%A3%B9%20168@2x.png',
            'https://media.vlpt.us/images/moseok/post/dd9def6b-96c6-48d6-89d2-7536f2400e4b/%EA%B7%B8%EB%A3%B9%20181@2x.png',
          ];
    } else {
      return levelTitle === '작은 새싹'
        ? [
            'https://media.vlpt.us/images/moseok/post/f11f7d45-aef0-47c3-9ea6-64ef2068bc82/%EC%9E%90%EC%82%B0%2044@2x.png',
            'https://media.vlpt.us/images/moseok/post/5a24807e-f5c6-4ac1-9596-ea47dd88c116/%EA%B7%B8%EB%A3%B9%20161@2x.png',
            'https://media.vlpt.us/images/moseok/post/2f568f26-fe8e-43d5-b442-3847e54c6b05/%EA%B7%B8%EB%A3%B9%20177@2x.png',
          ]
        : levelTitle === '큰 새싹'
        ? [
            'https://media.vlpt.us/images/moseok/post/a54e6f00-547b-48dd-b527-3e46eb3cc1b5/%EC%9E%90%EC%82%B0%2045@2x.png',
            'https://media.vlpt.us/images/moseok/post/53175e30-2f42-4582-995e-025d959ddf9d/%EA%B7%B8%EB%A3%B9%20162@2x.png',
            'https://media.vlpt.us/images/moseok/post/746858ea-785e-4c94-a937-3169ab8b78c7/%EA%B7%B8%EB%A3%B9%20178@2x.png',
          ]
        : levelTitle === '작은 나무'
        ? [
            'https://media.vlpt.us/images/moseok/post/b3afff38-2f25-4e14-a86f-07f574507baf/%EC%9E%90%EC%82%B0%2046@2x.png',
            'https://media.vlpt.us/images/moseok/post/8c91dc33-bd1b-4ded-9a19-890183981a0a/%EA%B7%B8%EB%A3%B9%20163@2x.png',
            'https://media.vlpt.us/images/moseok/post/fbc9f682-fbb8-4a2a-8978-6866a4346b5a/%EA%B7%B8%EB%A3%B9%20179@2x.png',
          ]
        : [
            'https://media.vlpt.us/images/moseok/post/20624981-79f2-4012-925e-30aea789bd75/%EC%9E%90%EC%82%B0%2047@2x.png',
            'https://media.vlpt.us/images/moseok/post/995fa58c-fe1c-4894-b3fd-d532ed38c2e9/%EA%B7%B8%EB%A3%B9%20164@2x.png',
            'https://media.vlpt.us/images/moseok/post/5fc7b142-67be-482a-bdc0-822d04146a5e/%EA%B7%B8%EB%A3%B9%20180@2x.png',
          ];
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
