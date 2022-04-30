import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBKq_GQEuoC1j7XNxfTwYW5ogS-qOI_XaY",
  authDomain: "file-portal-462f1.firebaseapp.com",
  projectId: "file-portal-462f1",
  storageBucket: "file-portal-462f1.appspot.com",
  messagingSenderId: "968538554252",
  appId: "1:968538554252:web:43242d23ef05a213dc20a9"
};

const app = initializeApp(firebaseConfig);
export default app