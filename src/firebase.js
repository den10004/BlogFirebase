import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDRlEoUYWIhC7karwr6ZLfB1hy-7LnBVg4",
  authDomain: "blog-3ad85.firebaseapp.com",
  projectId: "blog-3ad85",
  storageBucket: "blog-3ad85.appspot.com",
  messagingSenderId: "1047345580916",
  appId: "1:1047345580916:web:7d357fd6c040b579e6fa21",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
