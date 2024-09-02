import { createApi } from "@reduxjs/toolkit/query/react";
import { initNear } from "../../components/nearConfig";
import { Contract } from "near-api-js";

interface ExtendedContract extends Contract {
  ft_balance_of(params: { account_id: string }): Promise<string>;
}

interface Balance {
  near: string;
  hot: string;
}

interface Balances {
  [accountId: string]: Balance;
}

export const nearApi = createApi({
  reducerPath: 'nearApi',
  tagTypes: ['NearBalance'],
  baseQuery: async () => ({ data: {} }), // Пустой запрос
  endpoints: (builder) => ({
    getWalletBalance: builder.query<Balances, string[]>({
      async queryFn(walletAddresses) {
        const balances: Balances = {};

        try {
          const near = await initNear();
          const contract = new Contract(near.connection, 'game.hot.tg', {
            viewMethods: ['ft_balance_of'],
            changeMethods: [],
            useLocalViewExecution: false,
          }) as ExtendedContract;

          for (const address of walletAddresses) {
            try {
              const hotBalance = await contract.ft_balance_of({ account_id: address });
              const formattedHotBalance = (parseInt(hotBalance) / Math.pow(10, 6)).toFixed(6);
              
              const account = await near.account(address);
              const { total } = await account.getAccountBalance();
              const nearBalanceInNear = (parseFloat(total) / 1e24).toFixed(4);

              balances[address] = {
                near: nearBalanceInNear,
                hot: formattedHotBalance,
              };

            } catch (innerError) {
              console.error(`Ошибка при получении баланса для ${address}:`, innerError);
              balances[address] = { near: 'Ошибка', hot: 'Ошибка' };
            }
          }

          return { data: balances };
        } catch (error) {
          console.error("Ошибка при подключении к NEAR:", error);
          return { error: error as Error };
        }
      },
    }),
  }),
});

export const { useGetWalletBalanceQuery } = nearApi;
