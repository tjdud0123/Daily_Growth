import moment from 'moment';
import ApiConfig from './_config';

// 오늘의 아티클 받아보기
const getTodayArticlesApi = async () => {
  try {
    const { data } = await ApiConfig.get(`/article/today`);
    console.log('[SUCCESS] getTodayArticles', data);
    return data;
  } catch (e) {
    console.log('[FAIL] getTodayArticles', e);
  }
};

// 오늘의 저장된 아티클 받아보기
const getTodaySavedApi = async () => {
  try {
    const { data } = await ApiConfig.get(`/history`);
    if (data.status === 401) {
      return data;
    }
    const today = moment().format('L');
    const todaySaved = data.data.filter(
      a => moment(a.date).format('L') === today,
    );
    return todaySaved;
  } catch (e) {
    console.log('[FAIL] getTodayArticles', e);
  }
};

// 아티클 정보 가져오기
const getArticleByIdApi = async aid => {
  try {
    const { data } = await ApiConfig.get(`/history`);
    console.log(data.data);
    const response = data.data.filter(a => a.article_id === aid);
    return response[0];
  } catch (e) {
    console.log('[FAIL] getTodayArticles', e);
  }
};

// 아티클 저장
const saveArticleApi = async aid => {
  try {
    const { data } = await ApiConfig.post(`/article/save/${aid}`);
    console.log('[SUCCESS] saveArticle', data);
    return data;
  } catch (e) {
    console.log('[FAIL] saveArticle', e);
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
  }
};

export {
  getTodaySavedApi,
  getArticleByIdApi,
  getTodayArticlesApi,
  saveArticleApi,
  likeArticleApi,
  dislikeArticleApi,
};
