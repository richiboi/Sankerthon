import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyAMipawK5gOi3DhRdGcS5j3clv9r0ddduI",
  authDomain: "sankerthon.firebaseapp.com",
  databaseURL: "https://sankerthon.firebaseio.com",
  projectId: "sankerthon",
  storageBucket: "sankerthon.appspot.com",
  messagingSenderId: "156889949818",
  appId: "1:156889949818:web:a79a464512059d79107dc3",
  measurementId: "G-KCPGT9WLLR"
};

firebase.initializeApp(config);

export default firebase;