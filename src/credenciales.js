// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDl76hnJiZmgL89vQ8i-_XLHJOWHEsNF5g",
  authDomain: "tutoria-6cc64.firebaseapp.com",
  projectId: "tutoria-6cc64",
  storageBucket: "tutoria-6cc64.appspot.com",
  messagingSenderId: "470364471864",
  appId: "1:470364471864:web:d774ab15208df800f4dccd"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp