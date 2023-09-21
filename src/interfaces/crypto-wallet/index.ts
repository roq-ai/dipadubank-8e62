import { GetQueryInterface } from 'interfaces';

export interface CryptoWalletInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface CryptoWalletGetQueryInterface extends GetQueryInterface {
  id?: string;
}
