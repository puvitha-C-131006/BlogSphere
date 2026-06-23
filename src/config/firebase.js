import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDuAvDO5u3Av21GDpvqcn4spjgns_-cE5Q",
  authDomain: "blogsphere-394a5.firebaseapp.com",
  projectId: "blogsphere-394a5",
  storageBucket: "blogsphere-394a5.firebasestorage.app",
  messagingSenderId: "858004782137",
  appId: "1:858004782137:web:41b6a3b12ac952ba8e21e8",
  measurementId: "G-8732YEGEPK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
