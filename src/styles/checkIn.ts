import { StyleSheet } from 'react-native';
import { color } from './variables';

export default StyleSheet.create({
  containerView: {
    height: '100%',
    flex: 1,
    justifyContent: 'flex-start'
  },
  headerContainerView: {
    alignItems: 'stretch',
    borderBottomWidth: 1,
    borderColor: 'black',
  },
  infoContainerView: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5
  },
  leftContainerView: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  notYouContainerView: {
    flex: 1
  },
  employeeContainerView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    marginLeft: 5
  },
  checkingInText: {
    textAlign: 'center',
    fontSize: 12,
    fontWeight: '100'
  },
  employeeText: {
    fontSize: 12,
    fontWeight: '100',
    color: 'black'
  },
  notYouButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: color.secondary,
    height:30,
    borderRadius: 15
  },
  notYouText: {
    fontSize: 12,
    color: 'white'
  },
  checkInButtonContainerView: {
    justifyContent: 'center',
    margin: 5,
    padding: 5,
    backgroundColor: color.primary
  },
  checkInButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  checkInButtonText: {
    marginLeft: 10,
    color: 'white'
  },
  loadingBodyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
