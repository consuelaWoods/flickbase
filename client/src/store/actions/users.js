import axios from 'axios';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const registerUser = createAsyncThunk(
    'users/registerUser',
    async({email, password}, {dispatch}) => {
        try {
            const request = await axios.post('/api/auth/register', {
                email: email,
                password: password
            });
            // console.log(request.data, 'from users.registerUser');
            return  {
                data: request.data.user,
                auth: true
            }
        } catch (err) {
            throw err;
        }
    }
)
export const signInUser = createAsyncThunk(
    'users/signInUser',
    async({email, password}, {dispath}) => {
        try {
            const request = await axios.post('api/auth/signin', {
                email: email,
                password: password
            });
            return {
                data: request.data.user,
                auth: true
            }
        } catch (err) {
            throw err;
        }
    }
)