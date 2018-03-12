import { Navigation } from 'react-native-navigation';

import CheckIn from './screens/CheckIn';
import Checklist from './screens/Checklist';
import DeviceRegistration from './screens/DeviceRegistration';
import Menu from './screens/Menu';
import SignIn from './screens/SignIn';

// register all screens of the app (including internal ones)
export function registerScreens(store, Provider) {
  Navigation.registerComponent('CheckIn', () => CheckIn, store, Provider);
  Navigation.registerComponent('Checklist', () => Checklist, store, Provider);
  Navigation.registerComponent('DeviceRegistration', () => DeviceRegistration, store, Provider);
  Navigation.registerComponent('Menu', () => Menu, store, Provider);
  Navigation.registerComponent('SignIn', () => SignIn, store, Provider);
}
