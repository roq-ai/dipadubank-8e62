import axios from 'axios';
import queryString from 'query-string';
import { CryptoTransactionInterface, CryptoTransactionGetQueryInterface } from 'interfaces/crypto-transaction';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getCryptoTransactions = async (
  query?: CryptoTransactionGetQueryInterface,
): Promise<PaginatedInterface<CryptoTransactionInterface>> => {
  const response = await axios.get('/api/crypto-transactions', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createCryptoTransaction = async (cryptoTransaction: CryptoTransactionInterface) => {
  const response = await axios.post('/api/crypto-transactions', cryptoTransaction);
  return response.data;
};

export const updateCryptoTransactionById = async (id: string, cryptoTransaction: CryptoTransactionInterface) => {
  const response = await axios.put(`/api/crypto-transactions/${id}`, cryptoTransaction);
  return response.data;
};

export const getCryptoTransactionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/crypto-transactions/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteCryptoTransactionById = async (id: string) => {
  const response = await axios.delete(`/api/crypto-transactions/${id}`);
  return response.data;
};
