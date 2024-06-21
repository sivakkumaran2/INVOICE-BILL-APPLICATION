import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAPVADowdbLQtrDUbAAg93vhqPUNl2-HIo",
  authDomain: "fir-d6ce7.firebaseapp.com",
  projectId: "fir-d6ce7",
  storageBucket: "fir-d6ce7.appspot.com",
  messagingSenderId: "133343903310",
  appId: "1:133343903310:web:8e4b39d0728a871e4b8d1f",
  measurementId: "G-EL8K5MGJR8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
