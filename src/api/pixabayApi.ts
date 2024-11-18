import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pixabayApi = createApi({
  reducerPath: 'pixabayApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pixabay.com/api/' }),
  endpoints: (builder) => ({
    getImages: builder.query({
      query: ({ query, page }) => ({
        url: '',
        params: {
          key: '9360209-444ade903467890f43278d237',
          q: query,
          page,
        },
      }),
    }),
  }),
});

export const { useGetImagesQuery } = pixabayApi;
