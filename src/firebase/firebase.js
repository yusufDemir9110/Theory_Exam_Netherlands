import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBNXRE2jsm4L4hF98Tvtn1umCMKiclJaRY",
  authDomain: "driving-180d4.firebaseapp.com",
  databaseURL:
    "https://driving-180d4-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "driving-180d4",
  storageBucket: "driving-180d4.appspot.com",
  messagingSenderId: "660269160417",
  appId: "1:660269160417:web:a1bb372c7836aa5642e4a0",
  measurementId: "G-LQZZVR8LWH",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

const auth = getAuth(app);

const provider = new GoogleAuthProvider();

const storage = getStorage(app);

export default db;
export { auth, provider, storage };
