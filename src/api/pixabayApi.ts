import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pixabayApi = createApi({
  reducerPath: 'pixabayApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pixabay.com/api/' }),
  endpoints: (builder) => ({
    getImages: builder.query({
      query: ({ query, page }) => ({
        url: '',
        params: {
          key: 'YOUR_PIXABAY_API_KEY',
          q: query,
          page,
        },
      }),
    }),
  }),
});

export const { useGetImagesQuery } = pixabayApi;
