import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBKGWPtQgj7Dz_MLiWEXLLeMz5DOwov01M",
  authDomain: "fir-crud-570be.firebaseapp.com",
  projectId: "fir-crud-570be",
  storageBucket: "fir-crud-570be.appspot.com",
  messagingSenderId: "884718794215",
  appId: "1:884718794215:web:fa7a817818a7410e007942",
  measurementId: "G-5GVWPMQPHZ",
};

//initializing firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
