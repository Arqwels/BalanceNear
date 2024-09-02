import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface Account {
  id: number;
  accountId: string;
}

export const walletsApi = createApi({
  reducerPath: 'walletsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000' }),
  endpoints: (builder) => ({
    getWalletAddresses: builder.query<Account[], void>({
      query: () => '/get-accounts',
    }),
    deleteWalletAddress: builder.mutation<void, number>({
      query: (accountId) => ({
        url: `/delete-account/${accountId}`,
        method: 'DELETE',
      }),
      // Опционально: обновление кэша или синхронизация данных после удаления
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Можно обновить кэш или повторно получить данные после удаления
          dispatch(walletsApi.util.invalidateTags(['Wallet']));
        } catch (error) {
          console.error('Ошибка при удалении адреса:', error);
        }
      },
    }),
  }),
});

// Экспортируем хуки
export const { 
  useGetWalletAddressesQuery,
  useDeleteWalletAddressMutation 
} = walletsApi;
