// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC-fz9hjQVK7Jl3XGSANykL0CVjWgLxwuo",
  authDomain: "trip-at.firebaseapp.com",
  databaseURL: "https://trip-at-default-rtdb.firebaseio.com",
  projectId: "trip-at",
  storageBucket: "trip-at.appspot.com",
  messagingSenderId: "195465094904",
  appId: "1:195465094904:web:4230797f8dc89f3120bd0d",
  measurementId: "G-LE0HW0Q3HM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

const analytics = getAnalytics(app);

export default app;