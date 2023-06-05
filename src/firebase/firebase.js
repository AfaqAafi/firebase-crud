import {initializeApp} from 'firebase/app'
import { getAuth } from "firebase/auth";
import {collection, getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAux0NYNoMXWmLoeFErchh0aK5QLGowP80",
  authDomain: "todoapp-6991d.firebaseapp.com",
  projectId: "todoapp-6991d",
  storageBucket: "todoapp-6991d.appspot.com",
  messagingSenderId: "555190807210",
  appId: "1:555190807210:web:748867546f8a157b7c7ed3",
};
//! init firebase
const app = initializeApp(firebaseConfig)

// get serviecs
export const db = getFirestore(app);
export const auth = getAuth(app);

export const colRef = collection(db, 'todo');

