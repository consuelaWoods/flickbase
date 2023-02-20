import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

import { errorGlobal, successGlobal } from '../reducers/notifications';

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