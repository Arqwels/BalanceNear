import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Address {
  id: number;
  accountId: string;
}

export const addressApi = createApi({
  reducerPath: 'addressApi',
  tagTypes: ['address'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
  }),
  endpoints: builder => ({
    getAddresses: builder.query<Address[], void>({
      query: () => '/get-accounts',
      providesTags: () => [{
        type: 'address',
      }]
    }),

    addNewAddress: builder.mutation<void, string>({
      query: (accountId) => ({
        body: accountId,
        url: `/save-account`,
        method: 'POST',
      }),
    }),

    deleteAddress: builder.mutation<void, string>({
      query: (accountId) => ({
        url: `/delete-account/${accountId}`,
        method: 'DELETE',
      }),
      invalidatesTags: () => [{
        type: 'address',
      }]
    }),
  }),
});

export const { 
  useGetAddressesQuery,
  useAddNewAddressMutation,
  useDeleteAddressMutation
} = addressApi;