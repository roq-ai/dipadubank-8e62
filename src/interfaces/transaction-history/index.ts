import { GetQueryInterface } from 'interfaces';

export interface TransactionHistoryInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface TransactionHistoryGetQueryInterface extends GetQueryInterface {
  id?: string;
}
