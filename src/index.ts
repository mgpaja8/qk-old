import { Navigation } from 'react-native-navigation';
import { Provider } from 'react-redux';
import store from './store';
import { registerScreens } from './screens';

registerScreens(store, Provider);

Navigation.startSingleScreenApp({
  screen: {
    screen: 'DeviceRegistration',
    title: 'Welcome',
    navigatorStyle: {
      navBarHidden: true
    },
    navigatorButtons: {}
  },
  passProps: {},
  animationType: 'slide-down',
  drawer: {
    left: {
      screen: 'Menu',
    },
    style: {
      drawerShadow: false,
      contentOverlayColor: 'rgba(0,0,0,0.1)',
      leftDrawerWidth: 80,
      shouldStretchDrawer: false
    },
    type: 'MMDrawer',
    animationType: 'slide',
    disableOpenGesture: false
  },
});
