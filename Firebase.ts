import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";



// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyD3_gPsl81ei-Nv7MLz7pLMF2p1H567kUU",
  authDomain: "chatgpt-clone-67a70.firebaseapp.com",
  projectId: "chatgpt-clone-67a70",
  storageBucket: "chatgpt-clone-67a70.appspot.com",
  messagingSenderId: "193058989369",
  appId: "1:193058989369:web:63c2cbb0aec1508ee434e8"
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig)
const db = getFirestore(app);

export {db};