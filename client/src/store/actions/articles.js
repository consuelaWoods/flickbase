import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorGlobal, successGlobal } from '../reducers/notifications';
import { getAuthHeader } from '../../utils/tools';

axios.defaults.headers.post['Content-Type'] = 'application/json';

export const addArticle = createAsyncThunk(
    'articles/addArticle',
    async (article, {dispatch}) => {
        try {
            const request = await axios.post('/api/articles/', article, getAuthHeader());
            dispatch(successGlobal('Post created!!'))
            return request.data;
        } catch (err) {
            dispatch(errorGlobal(err.response.data.message))
            throw err
        }
    }
)