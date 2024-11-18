// import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../features/auth/authSlice';
// import bookmarksReducer from '../features/bookmarks/bookmarksSlice';
// import { pixabayApi } from '../api/pixabayApi';

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     bookmarks: bookmarksReducer,
//     [pixabayApi.reducerPath]: pixabayApi.reducer,
//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware().concat(pixabayApi.middleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
