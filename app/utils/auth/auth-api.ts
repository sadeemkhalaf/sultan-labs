import auth from "@react-native-firebase/auth"
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin"

/*
**************************************
    email/password authentication 
**************************************
*/

const signinWithEmailPassword = (email: string, password: string) => {
  auth()
    .createUserWithEmailAndPassword(email, password)
    .then((userInfo) => {
      console.log("User account created & signed in!", userInfo)
    })
    .catch((error) => {
      if (error.code === "auth/email-already-in-use") {
        console.log("That email address is already in use!")
      }
      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!")
      } else {
        // some other error happened
      }
    })
}

/*
****************************************
    Google signin
****************************************
*/

const signinWithGoogleAccount = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      // do something on successfully login


    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  