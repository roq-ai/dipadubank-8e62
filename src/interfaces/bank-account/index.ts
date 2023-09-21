import { GetQueryInterface } from 'interfaces';

export interface BankAccountInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  account_balance: number;
  account_type?: string;
  interest_rate?: number;
  account_number: string;
  account_status?: string;
  account_owner?: string;

  _count?: {};
}

export interface BankAccountGetQueryInterface extends GetQueryInterface {
  id?: string;
  account_type?: string;
  account_number?: string;
  account_status?: string;
  account_owner?: string;
}
