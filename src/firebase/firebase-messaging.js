import { initializeApp } from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import { getMessaging, getToken, onMessage } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: "AIzaSyC7t10B2BqwY3AWlPVPvhPje3atl9Za9-o",
  authDomain: "fcm-test-60629.firebaseapp.com",
  projectId: "fcm-test-60629",
  storageBucket: "fcm-test-60629.firebasestorage.app",
  messagingSenderId: "787339424657",
  appId: "1:787339424657:web:eb074db69404db02ba6030",
  measurementId: "G-ZPB4HTEE6E"
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
const analytics = getAnalytics(app);

export { messaging, getToken, onMessage, analytics };