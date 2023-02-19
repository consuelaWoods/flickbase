import { createSlice } from "@reduxjs/toolkit";

export const articlesSlice = createSlice({
    name: "articles",
    initialState: {
        homesort: {},
        loading: false,
        articles: [],
        current: null
    },
    reducers: {

    }
});
export default articlesSlice.reducer;