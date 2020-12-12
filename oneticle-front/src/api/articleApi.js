import ApiConfig from './_config';

// 오늘의 아티클 받아보기
const getTodayArticlesApi = async () => {
  try {
    const { data } = await ApiConfig.get(`/article/today`);
    console.log('[SUCCESS] getTodayArticles', data);
    return data;
  } catch (e) {
    console.log('[FAIL] getTodayArticles', e);
    throw e;
  }
};

// 아티클 저장
const saveArticleApi = async aid => {
  try {
    const { data } = await ApiConfig.post(`/article/save/${aid}`);
    console.log('[SUCCESS] saveArticle', data);
    return data.data;
  } catch (e) {
    console.log('[FAIL] saveArticle', e);
    throw e;
  }
};

// 아티클 좋아요
const likeArticleApi = async aid => {
  try {
    const { data } = await ApiConfig.post(`/article/like/${aid}`);
    console.log('[SUCCESS] likeArticle', data);
    return data.data;
  } catch (e) {
    console.log('[FAIL] likeArticle', e);
    throw e;
  }
};

// 아티클 좋아요 취소
const dislikeArticleApi = async aid => {
  try {
    const { data } = await ApiConfig.delete(`/article/like/${aid}`);
    console.log('[SUCCESS] dislikeArticle', data);
    return data.data;
  } catch (e) {
    console.log('[FAIL] dislikeArticle', e);
    throw e;
  }
};

export {
  getTodayArticlesApi,
  saveArticleApi,
  likeArticleApi,
  dislikeArticleApi,
};
