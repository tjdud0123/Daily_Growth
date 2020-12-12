import ApiConfig from './_config';

const readProfileApi = async () => {
  try {
    const { data } = await ApiConfig.get(`/user/profile`);
    console.log('[SUCCESS] readProfile', data);
    return data;
  } catch (e) {
    console.log('[FAIL] readProfile', e);
    throw e;
  }
};

const signInApi = async loginInfo => {
  try {
    const { data } = await ApiConfig.post(`/user/signin`, loginInfo);
    console.log('[SUCCESS] signIn', data);
    return data.data;
  } catch (e) {
    console.log('[FAIL] signIn', e.response.data.message);
    return e.response.data.message;
  }
};

const signUpApi = async userInfo => {
  try {
    const { data } = await ApiConfig.post(`/user/signup`, userInfo);
    console.log('[SUCCESS] signUp', data);
    return data.data;
  } catch (e) {
    console.log('[FAIL] signUp', e);
    throw e;
  }
};

export { readProfileApi, signInApi, signUpApi };
