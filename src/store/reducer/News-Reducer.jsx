import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk untuk fetching berita
export const fetchNewsByRoute = createAsyncThunk(
  "news/fetchNewsByRoute",
  async (route) => {
    // Cek jika ada query parameter
    const params = new URLSearchParams(route.split("?")[1]);
    const query = params.get("query") || route.replace("/", "").toLowerCase() || "indonesia";

    const response = await axios.get(
      `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query}&api-key=${import.meta.env.VITE_API_URL}`
    );

    return response.data.response.docs;
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState: {
    query: "",
    news: [],
    savedArticles: [],
    loading: false,
    error: null,
  },
  reducers: {
    setQuery: (state, action) => {
      state.query = action.payload; 
    },
    saveArticle: (state, action) => {
      const article = action.payload;
      if (!state.savedArticles.find((item) => item._id === article._id)) {
        state.savedArticles.push(article);
      }
    },
    removeArticle: (state, action) => {
      const articleId = action.payload;
      state.savedArticles = state.savedArticles.filter((item) => item._id !== articleId);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsByRoute.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsByRoute.fulfilled, (state, action) => {
        state.loading = false;
        state.news = action.payload;
      })
      .addCase(fetchNewsByRoute.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { setQuery, saveArticle, removeArticle } = newsSlice.actions;

export default newsSlice.reducer;
