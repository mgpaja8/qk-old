export function goToSignIn(navigator: any) {
  console.log('GO TO SIGN IN');
  navigator.resetTo({
      screen: 'SignIn',
      animated: true,
      animationType: 'fade',
      navigatorStyle: {
        navBarHidden: true
      }
    });
}
