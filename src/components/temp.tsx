import React, { useEffect, useState } from "react";
import { connect, keyStores, Near, Contract } from "near-api-js";
import Search from "./components/Search/search";

const nearConfig = {
  networkId: "mainnet",
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.mainnet.near.org",
  walletUrl: "https://wallet.mainnet.near.org",
  helperUrl: "https://helper.mainnet.near.org",
  explorerUrl: "https://explorer.mainnet.near.org",
};

const walletAddresses = ["feloryu.tg", "arqwels.tg"];
const tokenContractId = "game.hot.tg";

export async function initNear(): Promise<Near> {
  return await connect(nearConfig);
}

const WalletBalances: React.FC = () => {
  const [balances, setBalances] = useState<{ [key: string]: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBalances = async () => {
      const newBalances: { [key: string]: string } = {};
      try {
        const near = await initNear();
        const contract = new Contract(near.connection, tokenContractId, {
          viewMethods: ["ft_balance_of"],
          changeMethods: [],
        });
  
        for (const address of walletAddresses) {
          try {
            console.log(`Запрос баланса для ${address}`);
            const balance = await contract.ft_balance_of({ account_id: address });
            console.log(`Получен баланс для ${address}: ${balance}`);
  
            if (balance === undefined || balance === null) {
              console.error(`Баланс для ${address} не был возвращен.`);
              newBalances[address] = "Ошибка";
              continue;
            }

            const formattedBalance = (parseInt(balance) / Math.pow(10, 6)).toFixed(6);

            newBalances[address] = formattedBalance;
          } catch (innerError) {
            console.error(`Ошибка при получении баланса для ${address}:`, innerError);
            newBalances[address] = "Ошибка";
          }
        }
  
        console.log("Балансы после получения данных:", newBalances);
        setBalances(newBalances);
      } catch (error) {
        console.error("Ошибка при получении балансов:", error);
        setBalances(null);
      } finally {
        setLoading(false);
      }
    };
  
    fetchBalances();
  }, []);
  
  useEffect(() => {
    console.log("Баланс после обновления состояния:", balances);
  }, [balances]);
  

  return (
    <div className="container">
      <Search />
      <h1>Баланс кошельков:</h1>
      {loading ? (
        <p>Загрузка...</p>
      ) : balances ? (
        <ul>
          {Object.entries(balances).map(([address, balance]) => (
            <li key={address}>
              {address}: {balance} Tokens
            </li>
          ))}
        </ul>
      ) : (
        <p>Не удалось загрузить балансы.</p>
      )}
    </div>
  );
};

export default WalletBalances;
