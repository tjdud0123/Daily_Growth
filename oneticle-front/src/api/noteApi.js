import ApiConfig from './_config';

const createNoteApi = async (aid, noteContent) => {
  try {
    const { data } = await ApiConfig.post(`/note/${aid}`, noteContent);
    console.log('[SUCCESS] createNote', data);
    return data;
  } catch (e) {
    console.log('[FAIL] createNote', e);
    throw e;
  }
};

const updateNoteApi = async (nid, noteContent) => {
  try {
    const { data } = await ApiConfig.put(`/note/${nid}`, noteContent);
    console.log('[SUCCESS] updateNote', data);
    return data;
  } catch (e) {
    console.log('[FAIL] updateNote', e);
    throw e;
  }
};

export { createNoteApi, updateNoteApi };
