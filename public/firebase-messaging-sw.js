// public/firebase-messaging-sw.js
importScripts("https://www.gstatic.com/firebasejs/11.8.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/11.8.0/firebase-messaging-compat.js");

firebase.initializeApp({
  apiKey: "AIzaSyC7t10B2BqwY3AWlPVPvhPje3atl9Za9-o",
  authDomain: "fcm-test-60629.firebaseapp.com",
  projectId: "fcm-test-60629",
  storageBucket: "fcm-test-60629.firebasestorage.app",
  messagingSenderId: "787339424657",
  appId: "1:787339424657:web:eb074db69404db02ba6030",
  measurementId: "G-ZPB4HTEE6E"
});

const messaging = firebase.messaging();

// 백그라운드에서 푸시 수신 처리
messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message ', payload);
  const { title, body } = payload.data;
  self.registration.showNotification(title, {
    body: body,
    icon: '/logo192.png',
  });
});