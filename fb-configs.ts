import auth from "@react-native-firebase/auth";
import firebase from "@react-native-firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAEsfqv9d9uHojEsHNCxJgonUsdGjWMnXI",
  authDomain: "sultan-labs.firebaseapp.com",
  projectId: "sultan-labs",
  storageBucket: "sultan-labs.appspot.com",
  messagingSenderId: "8258525560",
  appId: "1:8258525560:web:cf57c7dd3d9b3f8308508d",
  measurementId: "G-Y8PLYFLKSH"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase, auth };