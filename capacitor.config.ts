import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.bennyshop.mobile',
  appName: 'Benny Shop',
  webDir: 'dist',
  android: {
    icon: 'public/favicon.svg'
  }
};

export default config;
