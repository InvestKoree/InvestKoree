

// Base API slice configuration
const INVESTMENT_URL = '/investments'; // Should be relative to /api

export const investmentApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getInvestments: builder.query({
      query: () => ({
        url: INVESTMENT_URL,
        method: 'GET',
      }),
      providesTags: ['Investment'], // Tag for cache invalidation
    }),
  }),
});

export const { useGetInvestmentsQuery } = investmentApiSlice;