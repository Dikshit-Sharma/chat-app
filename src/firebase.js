import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBUTc-YV0uP1_z6T88BMgbQod8pW9jJjQI",
  authDomain: "chat-app-b24b7.firebaseapp.com",
  projectId: "chat-app-b24b7",
  storageBucket: "chat-app-b24b7.appspot.com",
  messagingSenderId: "453716610411",
  appId: "1:453716610411:web:8a93673dc1a8534e03902e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()