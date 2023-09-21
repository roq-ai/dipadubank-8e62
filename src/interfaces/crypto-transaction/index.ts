import { GetQueryInterface } from 'interfaces';

export interface CryptoTransactionInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface CryptoTransactionGetQueryInterface extends GetQueryInterface {
  id?: string;
}
