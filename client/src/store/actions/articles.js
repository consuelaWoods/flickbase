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

export const getArticle = createAsyncThunk(
    //no reducer because it doesn't change state
    'articles/getArticle',
    async (_id, {dispatch}) => {
        try {
            const request = await axios.get(`/api/articles/article/${_id}`, getAuthHeader());
            return request.data;
        } catch (err) {
            dispatch(errorGlobal(err.response.data.message))
            throw err
        }
    }
)
export const updateArticle = createAsyncThunk(
    'articles/updateArticle',
    async({values,articleId},{ dispatch })=>{
        try{
            await axios.patch(`/api/articles/article/${articleId}`,values,getAuthHeader());
            dispatch(successGlobal('Article updated !!'))
            return true;
        } catch(error){
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }
)
export const getPageArticles = createAsyncThunk(
    'articles/getPageArticles',
    async({page=1, limit=2, keywords=''}, {dispatch}) => {
        try {
            const request = await axios.post(
                '/api/articles/admin/paginate', 
                {
                    page,
                    limit,
                    keywords
                },
                getAuthHeader()
            );
            // console.log(request.data, 'actions');
            return request.data;
        } catch(error){
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }
)
export const changeStatus = createAsyncThunk(
    //http://127.0.0.1:3001/api/articles/article/63eeaa697edcd88a5d0156ca
    'articles/changeStatus',
    async({newStatus, _id}, {dispatch, getState}) => {
        try {
            const request = await axios.patch(
                `/api/articles/article/${_id}`, 
                {status:newStatus}, 
                getAuthHeader());
            
            //refresh screen
            let article = request.data;
            let state = getState().articles.adminArticles.docs;
            let position = state.findIndex( article => article._id === _id);
            //copy state and mutate the copy
            const newState = [...state];
            newState[position] = article;
            dispatch(successGlobal('Status updated!!'))
            return newState;

        } catch(error){
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }
)
export const removeArticle = createAsyncThunk(
    //http://127.0.0.1:3001/api/articles/article/63eeaa697edcd88a5d0156ca?
    'articles/removeArticle',
    async(_id, {dispatch, getState}) => {
        try {
            await axios.delete(`/api/articles/article/${_id}`, getAuthHeader())
            dispatch(successGlobal('Article removed!!'))

            //refresh screen
            let page = getState().articles.adminArticles.page
            dispatch(getPageArticles({page}))
            return true;

        } catch(error){
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }
)
export const homeLoadMore = createAsyncThunk(
    'articles/homeLoadMore',
    async(sort,{ dispatch, getState })=>{
        try{
            const articles = await axios.post(`/api/articles/all`,sort);
            const state = getState().articles.articles;
            
            const prevState = [...state];
            const newState = [...prevState,...articles.data]

            return { newState,sort }
        } catch(error){
            dispatch(errorGlobal(error.response.data.message))
            throw error
        }
    }
)