import { useState, useEffect } from 'react';
import Footer from "./components/Footer/Footer";
import Item from "./components/Item/Item";
import Search from "./components/Search/Search";
import WalletBalances from "./components/WalletBalances";
import { useGetAddressesQuery } from "./store/api/adressApi";
import { useGetWalletBalanceQuery } from "./store/api/nearApi";
import localWallets from './local_wallets.json';

// Определяем типы
type Address = {
  id: number;
  accountId: string;
};

type Balance = {
  near: string;
  hot: string;
};

type Balances = {
  [accountId: string]: Balance;
};

const App = () => {
  // Используем хук для получения адресов
  const { data: addressesFromServer, isLoading: addressesLoading, error: errorAddress } = useGetAddressesQuery();
  const [addresses, setAddresses] = useState<Address[]>([]);

  // Если произошла ошибка, используем локальные данные
  useEffect(() => {
    if (errorAddress) {
      console.error('Ошибка загрузки адресов с сервера:', errorAddress);
      setAddresses(localWallets as Address[]);
      console.log('Не удалось загрузить данные с сервера, используются локальные данные');
    } else if (addressesFromServer) {
      setAddresses(addressesFromServer);
    }
  }, [addressesFromServer, errorAddress]);
  
  // Получаем балансы для адресов
  const walletAddresses = addresses.map((address) => address.accountId) || [];
  const { data: balances, isLoading: balanceLoading } = useGetWalletBalanceQuery(walletAddresses, {
    skip: walletAddresses.length === 0,
  });

  const isLoading = addressesLoading || balanceLoading;

  // Функция для вычисления сумм балансов
  const calculateTotals = (balances: Balances | undefined) => {
    let totalHot = 0;
    let totalNear = 0;

    if (balances) {
      for (const key in balances) {
        totalHot += parseFloat(balances[key].hot || '0');
        totalNear += parseFloat(balances[key].near || '0');
      }
    }

    return { totalHot, totalNear };
  };

  const { totalHot, totalNear } = calculateTotals(balances);

  return (
    <div className="container">
      <header className="header">
        <Search />
      </header>
      <main>
        <WalletBalances />
        {isLoading ? (
          <div>Загрузка...</div>
        ) : (
          addresses.map(wallet => {
            const balance = balances?.[wallet.accountId] || { near: '0', hot: '0' };
            return (
              <Item 
                key={wallet.id}
                nickname={wallet.accountId as string}
                balanceNear={parseFloat(balance.near)}
                balanceHot={parseFloat(balance.hot)}
              />
            );
          })
        )}
      </main>
      <Footer totalHot={totalHot} totalNear={totalNear} />
    </div>
  );
};

export default App;
