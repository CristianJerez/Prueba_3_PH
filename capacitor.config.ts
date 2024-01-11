import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'ionic.destinosvacacionales',
  appName: 'destinosvacacionales',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  },
  plugins:{
    CapacitorHttp: {
      enabled: true
    }
  }
};

export default config;
