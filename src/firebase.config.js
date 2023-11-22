import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
const firebaseConfig = {
    apiKey: "AIzaSyCETNJebRmxKplqMn8OvmaQreb-8gYTLXE",
    authDomain: "real-estate-firebase-d1861.firebaseapp.com",
    projectId: "real-estate-firebase-d1861",
    storageBucket: "real-estate-firebase-d1861.appspot.com",
    messagingSenderId: "1090256335985",
    appId: "1:1090256335985:web:a97c18e00296050f6e57d0"
  };

const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
export const db=getFirestore(app)
export const storage =getStorage(app)
export default app