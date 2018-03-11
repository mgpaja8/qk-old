import { Navigation } from 'react-native-navigation';

import Hello from './Hello';

// register all screens of the app (including internal ones)
export function registerScreens() {
  Navigation.registerComponent('example.Hello', () => Hello);
}
