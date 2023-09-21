interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Owner'],
  customerRoles: ['Customer'],
  tenantRoles: ['Owner', 'End Customer'],
  tenantName: 'Company',
  applicationName: 'DipaDuBank',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [
    'Manage user profile',
    'Manage bank account',
    'Manage transaction history',
    'Manage crypto wallet',
  ],
  ownerAbilities: [
    'Manage user profiles',
    'Manage crypto transactions',
    'Manage bank accounts',
    'Manage transaction histories',
  ],
  getQuoteUrl: 'https://app.roq.ai/proposal/cc30087b-7cbb-45a9-a0dd-299aaf5a385e',
};
