import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCGV7uWA1GbSzy6YkWZAA6kuWXFy_bsGEs",
  authDomain: "foodtracker-239b9.firebaseapp.com",
  projectId: "foodtracker-239b9",
  storageBucket: "foodtracker-239b9.appspot.com",
  messagingSenderId: "427282752803",
  appId: "1:427282752803:web:783fbd04ca261a2d2ed896",
  measurementId: "G-JN36YX73ZS"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Use local backend in development, Vercel in production
const isDevelopment = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
export const BACKEND_URL = isDevelopment
  ? 'http://localhost:3000' 
  : 'https://bite-wise-tawny.vercel.app';

console.log('Environment:', isDevelopment ? 'Development' : 'Production');
console.log('Backend URL:', BACKEND_URL);

export const APP_ID = 'default-food-tracker';
