import axios from 'axios';
import queryString from 'query-string';
import { TransactionHistoryInterface, TransactionHistoryGetQueryInterface } from 'interfaces/transaction-history';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getTransactionHistories = async (
  query?: TransactionHistoryGetQueryInterface,
): Promise<PaginatedInterface<TransactionHistoryInterface>> => {
  const response = await axios.get('/api/transaction-histories', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createTransactionHistory = async (transactionHistory: TransactionHistoryInterface) => {
  const response = await axios.post('/api/transaction-histories', transactionHistory);
  return response.data;
};

export const updateTransactionHistoryById = async (id: string, transactionHistory: TransactionHistoryInterface) => {
  const response = await axios.put(`/api/transaction-histories/${id}`, transactionHistory);
  return response.data;
};

export const getTransactionHistoryById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(
    `/api/transaction-histories/${id}${query ? `?${queryString.stringify(query)}` : ''}`,
  );
  return response.data;
};

export const deleteTransactionHistoryById = async (id: string) => {
  const response = await axios.delete(`/api/transaction-histories/${id}`);
  return response.data;
};
