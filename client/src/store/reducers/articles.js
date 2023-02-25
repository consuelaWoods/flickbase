import { createSlice } from "@reduxjs/toolkit";
import {
    addArticle,
    getPageArticles,
    changeStatus
} from '../actions/articles';

export const articlesSlice = createSlice({
    name: "articles",
    initialState: {
        homesort: {},
        loading: false,
        articles: [],
        current: null
    },
    reducers: {},
    extraReducers:(builder) => {
        builder
        // ADD 
        .addCase(addArticle.pending, (state) => {state.loading = true})
        .addCase(addArticle.fulfilled, (state, action) => {
            state.loading = false;
            state.lastAdded = action.payload;
        })
        .addCase(addArticle.rejected, (state) => {state.loading = false})

        // GET A PAGE OF ARTICLES
        .addCase(getPageArticles.pending, (state) => {state.loading = true})
        .addCase(getPageArticles.fulfilled, (state, action) => {
            state.loading = false;
            // console.log(action.payload, 'reducer')
            state.adminArticles = action.payload;
        })
        .addCase(getPageArticles.rejected, (state) => {state.loading = false})

        //UPDATE STATUS
        .addCase(changeStatus.fulfilled, (state, action) => {
            state.adminArticles.docs = action.payload
        })
    }
});
export default articlesSlice.reducer;