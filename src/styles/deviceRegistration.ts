import { StyleSheet } from 'react-native';
import DeviceInfo from 'react-native-device-info';

const iphoneX = DeviceInfo.getModel() === 'iPhone X' ? true : false;

export default StyleSheet.create({
  containerView: {
    paddingTop: iphoneX ? 44 : 20,
    paddingLeft: 5,
    paddingRight: 5,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  registrationFailedText: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 5
  },
  imageView: {
    marginBottom: 5
  },
  errorText: {
    fontSize: 12,
    fontWeight: '100'
  }
});
