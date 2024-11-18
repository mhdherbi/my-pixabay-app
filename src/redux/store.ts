import { configureStore } from '@reduxjs/toolkit';
import bookmarkReducer from '../features/bookmarks/bookmarksSlice';
import { pixabayApi } from '../api/pixabayApi';

export const store = configureStore({
  reducer: {
    bookmark: bookmarkReducer, // Reducer untuk bookmarks
    [pixabayApi.reducerPath]: pixabayApi.reducer, // Reducer untuk API Pixabay
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pixabayApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>; // Tipe global state
export type AppDispatch = typeof store.dispatch; // Tipe dispatch
