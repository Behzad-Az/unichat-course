import firebase from 'firebase/app';
import 'firebase/auth';

export const auth = firebase.initializeApp({
  apiKey: "AIzaSyAMcJ2n99OHSE-JAILwbG2Cp3ndCr9twVI",
  authDomain: "unichat-67319.firebaseapp.com",
  projectId: "unichat-67319",
  storageBucket: "unichat-67319.appspot.com",
  messagingSenderId: "87581175013",
  appId: "1:87581175013:web:e0679c3942bfbffa54f80c"
}).auth();
