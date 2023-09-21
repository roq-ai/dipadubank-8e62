const mapping: Record<string, string> = {
  'bank-accounts': 'bank_account',
  companies: 'company',
  'crypto-transactions': 'crypto_transaction',
  'crypto-wallets': 'crypto_wallet',
  'transaction-histories': 'transaction_history',
  users: 'user',
  'user-profiles': 'user_profile',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
