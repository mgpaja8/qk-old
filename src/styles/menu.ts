import { StyleSheet } from 'react-native';
import { color } from './variables';

export default StyleSheet.create({
  container: {
    backgroundColor: color.secondaryDark,
    flex: 1
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: 5,
    marginBottom: 20
  },
  employeeContainer: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 5
  },
  menuItemContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: 50,
    padding: 5
  },
  selectedMenuItem: {
    backgroundColor: color.black
  },
  whiteText: {
    fontSize: 12,
    fontWeight: '100',
    color: color.white
  }
});
