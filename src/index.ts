import { Navigation } from 'react-native-navigation';

import { registerScreens } from './screens';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'example.Hello',
    title: 'Welcome',
    navigatorStyle: {},
    navigatorButtons: {}
  },
  passProps: {},
  animationType: 'slide-down'
});
