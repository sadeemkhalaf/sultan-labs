import firebase from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';

  const credentials = {
    apiKey: "AIzaSyAEsfqv9d9uHojEsHNCxJgonUsdGjWMnXI",
    authDomain: "sultan-labs.firebaseapp.com",
    projectId: "sultan-labs",
    storageBucket: "sultan-labs.appspot.com",
    messagingSenderId: "8258525560",
    appId: "1:8258525560:web:7276b43a5e318f2608508d",
    measurementId: "G-5S9QFTNXLC",
  };

  const config = {
    name: 'SULTAN_APP',
  };
  
firestore().collection('users').get().then((data) => console.log(data))
firebase.initializeApp(credentials, config);
