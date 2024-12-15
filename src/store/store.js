import { configureStore } from "@reduxjs/toolkit";
import newsReducer from "./reducer/News-Reducer";

export const store = configureStore({
  reducer: {
    news: newsReducer,
  },
});
