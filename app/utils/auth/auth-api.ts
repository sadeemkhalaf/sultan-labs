import { firebase, firestore } from "./../../../fb-configs"
import { GoogleSignin, statusCodes } from "@react-native-google-signin/google-signin"
import { googleWebClientID, googleBasicProfileAccess, googleIosClientID } from "./auth-configs"

/*
**************************************
    email/password authentication 
**************************************
*/

const signinWithEmailPassword = (email: string, password: string) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

const signupWithEmailPassword = (email: string, password: string) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}

const getUserInfo = (uid: string) => {
  return firestore().collection("users").doc(uid)
}

const checkUserExists = (email: string) => {
  return firebase.auth().fetchSignInMethodsForEmail(email)
}

/*
****************************************
    Google signin
****************************************
*/
// ------------------------ Google Events ------------------------
const configureGoogleSigin = () => {
  GoogleSignin.configure({
    webClientId: googleWebClientID, // client ID of type WEB for your server (needed to verify user ID and offline access)
    scopes: googleBasicProfileAccess,
    offlineAccess: false, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    iosClientId: googleIosClientID,
  })
}

const signinWithGoogleAccount = async () => {
  try {
    await GoogleSignin.hasPlayServices()
    const userInfo = await GoogleSignin.signIn()

    console.log(userInfo)

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
}

export {
  configureGoogleSigin,
  signupWithEmailPassword,
  signinWithEmailPassword,
  signinWithGoogleAccount,
  checkUserExists,
  getUserInfo,
}
