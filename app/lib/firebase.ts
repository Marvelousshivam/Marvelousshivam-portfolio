import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCQWIKbnqKwQq-4mwuZi8yxD8UaYCbcq84",
  authDomain: "marvelous-shivam.firebaseapp.com",
  projectId: "marvelous-shivam",
  storageBucket: "marvelous-shivam.firebasestorage.app",
  messagingSenderId: "194180833369",
  appId: "1:194180833369:web:159b2f9ee659b8d39f9148",
  measurementId: "G-0FQ0NB423K"
};

// Initialize Firebase securely (avoiding re-initialization errors in Next.js development)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Analytics is only supported in browser environments
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics };
