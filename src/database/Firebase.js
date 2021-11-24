import firebase from "firebase/compat";

const firebaseConfig = {
  apiKey: "AIzaSyBmLLiln2CW8fGf5iIyeRx0JAXLudZ2L9g",
  authDomain: "bienestar-usc-auth.firebaseapp.com",
  projectId: "bienestar-usc-auth",
  storageBucket: "bienestar-usc-auth.appspot.com",
  messagingSenderId: "393425531666",
  appId: "1:393425531666:web:3585a81222893222a079cb",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const googleProvider = new firebase.auth.GoogleAuthProvider();

export { auth, googleProvider };
