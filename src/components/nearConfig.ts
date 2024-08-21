import { keyStores, connect, Near } from "near-api-js";

const nearConfig = {
  networkId: "mainnet", // Используем основную сеть
  keyStore: new keyStores.BrowserLocalStorageKeyStore(),
  nodeUrl: "https://rpc.mainnet.near.org", // URL для RPC основной сети
  walletUrl: "https://wallet.mainnet.near.org", // URL для кошелька основной сети
  helperUrl: "https://helper.mainnet.near.org", // URL для вспомогательного сервиса основной сети
  explorerUrl: "https://explorer.mainnet.near.org", // URL для обозревателя блоков основной сети
};

export async function initNear(): Promise<Near> {
  return await connect(nearConfig);
}
