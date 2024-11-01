import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCHNsGf5xuq68J50r6OLqYD7c39M6mxXWo",
  authDomain: "reactflix-67820.firebaseapp.com",
  projectId: "reactflix-67820",
  storageBucket: "reactflix-67820.firebasestorage.app",
  messagingSenderId: "375987397800",
  appId: "1:375987397800:web:ce2ce269957315e93f8e9d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);


export default app;