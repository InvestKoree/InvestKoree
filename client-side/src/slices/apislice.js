import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Base API slice configuration
// const baseQuery = fetchBaseQuery({ baseUrl: 'investkoree-server-side.vercel.app' });
const baseQuery = fetchBaseQuery({ baseUrl: 'investkoree-server-side.vercel.app' });

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});