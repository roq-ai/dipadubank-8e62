import axios from 'axios';
import queryString from 'query-string';
import { CryptoWalletInterface, CryptoWalletGetQueryInterface } from 'interfaces/crypto-wallet';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCryptoWallets = async (
  query?: CryptoWalletGetQueryInterface,
): Promise<PaginatedInterface<CryptoWalletInterface>> => {
  const response = await axios.get('/api/crypto-wallets', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCryptoWallet = async (cryptoWallet: CryptoWalletInterface) => {
  const response = await axios.post('/api/crypto-wallets', cryptoWallet);
  return response.data;
};

export const updateCryptoWalletById = async (id: string, cryptoWallet: CryptoWalletInterface) => {
  const response = await axios.put(`/api/crypto-wallets/${id}`, cryptoWallet);
  return response.data;
};

export const getCryptoWalletById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/crypto-wallets/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCryptoWalletById = async (id: string) => {
  const response = await axios.delete(`/api/crypto-wallets/${id}`);
  return response.data;
};
