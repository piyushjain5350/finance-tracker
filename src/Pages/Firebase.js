// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth , GoogleAuthProvider} from "firebase/auth";
import {getFirestore, doc , setDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBj1-vQAEwTTk7FgBznh3lq4FdqITjsH18",
  authDomain: "finance-tracker-6a3e1.firebaseapp.com",
  projectId: "finance-tracker-6a3e1",
  storageBucket: "finance-tracker-6a3e1.appspot.com",
  messagingSenderId: "432140897340",
  appId: "1:432140897340:web:6bb25d33c6d42e8d420739",
  measurementId: "G-HGRBFK1EFL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const db=getFirestore(app);
const auth=getAuth(app);
const provider=new GoogleAuthProvider(app);

export {db,auth,provider,doc,setDoc }