import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "REACT_APP_API_KEY_GOES_HERE",
  authDomain: "REACT_APP_AUTH_DOMAIN_GOES_HERE",
  projectId: "REACT_APP_PROJECT_ID_GOES_HERE",
  storageBucket: "REACT_APP_STORAGE_BUCKET_GOES_HERE",
  messagingSenderId: "REACT_APP_MESSSAGING_SENDER_ID_GOES_HERE",
  appId: "REACT_APP_APP_ID_GOES_HERE",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firebase = getFirestore(app);