import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorGlobal, successGlobal } from '../reducers/notifications';
import { setVerify } from '../reducers/users';
import { getAuthHeader, removeTokenCookie } from '../../utils/tools';

export const registerUser = createAsyncThunk(
    'users/registerUser',
    async({email, password}, {dispatch}) => {
        try {
            const request = await axios.post('/api/auth/register', {
                email: email,
                password: password
            });
            // console.log(request.data, 'from users.registerUser');
            dispatch (successGlobal('Welcome!! Check your email and valildate account'));
            return  {
                data: request.data.user,
                auth: true
            }
        } catch (err) {     //server returns an ApiError object
            dispatch (errorGlobal(err.response.data.message));
            throw err;
        }
    }
)
export const signInUser = createAsyncThunk(
    'users/signInUser',
    async({email, password}, {dispatch}) => {
        try {
            const request = await axios.post('api/auth/signin', {
                email: email,
                password: password
            });
            dispatch (successGlobal ("Welcome back!!"))
            return {
                data: request.data.user,
                auth: true
            }
        } catch (err) {
            dispatch (errorGlobal(err.response.data.message));
            throw err;
        }
    }
)

export const isAuth = createAsyncThunk(
    '/user/isAuth',
    async() => {
        try {
            const request = await axios.get('/api/auth/isauth', getAuthHeader())
            return { data:request.data, auth: true }
        } catch (err) {
            return { data:{}, auth: false}
        }
    }
)

export const signOut = createAsyncThunk(
    'user/signOut',
    async() => {
        removeTokenCookie();
    }
)

export const updateProfile = createAsyncThunk(
    //http://127.0.0.1:3001/api/users/profile
    'user/updateProfile',
    async(data, {dispatch}) => {
        try {
            const profile = await axios.patch(
                `/api/users/profile`,
                data,
                getAuthHeader()
            )
            dispatch(successGlobal('Profile updated!!'))
            return {
                firstname: profile.data.firstname,
                lastname: profile.data.lastname,
                age: profile.data.age
            }
        } catch (err) {
            dispatch (errorGlobal(err.response.data.message));
            throw err;
        }
    }
)

export const changeEmail = createAsyncThunk(
    //http://127.0.0.1:3001/api/users/email
    'users/changeEmail',
    async (data, {dispatch}) => {
        try {
            // console.log(data, 'action/changeEmail');
            const request = axios.patch('/api/users/email', {
                // email: data.email,
                newemail: data.newemail
            }, getAuthHeader());
            dispatch(successGlobal('Email updated!!'))
            // console.log(request, 'actions/changeEmail complete')
            return {
                // email: request.data.user.email,
                email: request.user.email,
                verified: false
            }

        } catch (err) {
            dispatch (errorGlobal(err.response.data.message));
            throw err;
        }
    }
)
export const acctVerify = createAsyncThunk(
    'users/acctVerify',
    async(token, {dispatch, getState}) => {
        try {
            const user = getState().users.auth;
            await axios.get(`/api/users/verify?validation=${token}`);

            if (user) {
                dispatch(setVerify())
            }

            dispatch(successGlobal('Email updated!!'));

        } catch (err) {
            dispatch (errorGlobal(err.response.data.message));
            throw err;
        }
    }
)