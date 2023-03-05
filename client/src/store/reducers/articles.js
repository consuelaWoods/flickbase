import { createSlice } from "@reduxjs/toolkit";
import {
    addArticle,
    getPageArticles,
    changeStatus,
    homeLoadMore,
    getUserArticle,
    getCategories
} from '../actions/articles';

export const articlesSlice = createSlice({
    name: "articles",
    initialState: {
        homeSort: {
            sortby:"_id",
            order:"desc",
            limit: 4,
            skip:0
        },
        loading: false,
        articles: [],
        current: null,
        categories: []
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

        //LOAD ARTICLES
        .addCase(homeLoadMore.pending, (state) => {state.loading = true})
        .addCase(homeLoadMore.fulfilled,(state,action)=>{ 
            state.homeSort.skip = action.payload.sort.skip
            state.articles = action.payload.newState
            state.loading = false
        })
        .addCase(homeLoadMore.rejected, (state) => {state.loading = false})

        .addCase(getUserArticle.pending, (state) => {state.loading = true})
        .addCase(getUserArticle.rejected, (state) => {state.loading = false})
        .addCase(getUserArticle.fulfilled, (state, action) => {
            state.loading = false
            state.current = action.payload
        })

        // LOAD CATEGORIES
        .addCase(getCategories.fulfilled, (state, action) => {
            state.categories = action.payload;
        })
    }
});
export default articlesSlice.reducer;