import React from 'react';
// import { useGetWalletAddressesQuery, useDeleteWalletAddressMutation } from '../store/api/walletsApi';
// import { useGetWalletBalanceQuery } from '../store/api/nearApi';
import { useGetAddressesQuery } from '../store/api/adressApi';

const WalletBalances: React.FC = () => {
  // Получаем данные из API
  // const { data: walletAddressesData, error: addressesError, isLoading: addressesLoading } = useGetWalletAddressesQuery();
  
  // // Хук для удаления адреса
  // const [deleteWalletAddress] = useDeleteWalletAddressMutation();

  // // Преобразуем данные в массив строк accountId
  // const walletAddresses = walletAddressesData?.map((address) => address.accountId) || [];

  // // console.log(walletAddresses);

  // const { data: balances, error: balancesError, isLoading: balancesLoading } = useGetWalletBalanceQuery(walletAddresses, {
  //   skip: walletAddresses.length === 0, // Не отправлять запрос, пока адреса не загружены
  // });

  // const { data, isLoading } = useGetAddressesQuery();

  // console.log(data);
  

  // Обработчик удаления адреса
  // const handleDelete = (accountId: number) => {
  //   if (window.confirm('Вы уверены, что хотите удалить этот адрес?')) {
  //     deleteWalletAddress(accountId)
  //       .unwrap()
  //       .then(() => {
  //         // Успешное удаление
  //         console.log(`Адрес ${accountId} успешно удалён`);
  //       })
  //       .catch((error) => {
  //         // Ошибка при удалении
  //         console.error('Ошибка при удалении адреса:', error);
  //       });
  //   }
  // };

  return (
    <div className="container">
      <h1>Баланс кошельков:</h1>
      {/* {addressesLoading ? (
        <p>Загрузка адресов...</p>
      ) : addressesError ? (
        <p>Не удалось загрузить адреса кошельков.</p>
      ) : balancesLoading ? (
        <p>Загрузка балансов...</p>
      ) : balancesError ? (
        <p>Не удалось загрузить балансы.</p>
      ) : (
        <ul>
          {walletAddresses.map((address) => (
            <li key={address}>
              {address}: {balances?.[address] || 'N/A'} HOT, {balances?.[`${address}_near`] || 'N/A'} NEAR
              <button onClick={() => handleDelete(address)}>Удалить</button>
            </li>
          ))}
        </ul>
      )} */}
    </div>
  );
};

export default WalletBalances;
