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
    height: 35,
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
  },
  bodyContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    paddingVertical: 10,
    paddingHorizontal: 5
  },
  taskGroupButton: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: color.primary
  },
  taskGroupButtonText: {
    fontSize: 12,
    color: color.black,
    textAlign: 'center'
  },
  disabledText: {
    fontSize: 12,
    color: color.mediumGrey,
    textAlign: 'center'
  },
  selectedButton: {
    backgroundColor: color.primary
  },
  selectedText: {
    fontSize: 12,
    color: color.white,
    textAlign: 'center'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5
  },
  errorTitleText: {
    fontWeight: 'bold',
    fontSize: 12,
    marginBottom: 5
  },
  errorImageView: {
    marginBottom: 5
  },
  errorText: {
    fontSize: 12,
    fontWeight: '100',
    marginBottom: 5
  },
  tryAgainButton: {
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch',
    backgroundColor: color.primary
  },
  tryAgainText: {
    fontSize: 14,
    color: 'white'
  }
});
