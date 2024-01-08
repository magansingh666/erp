importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-app.js");

importScripts("https://www.gstatic.com/firebasejs/8.8.0/firebase-messaging.js");
self.addEventListener('install', () => {
  console.log('\n\n firebase service worker installed');
});



const firebaseConfig = {
  apiKey: "AIzaSyAHANitseq1p_NVwIZcoogN6iamw4GC_Vo",
  authDomain: "erp-hrm-c1814.firebaseapp.com",
  projectId: "erp-hrm-c1814",
  storageBucket: "erp-hrm-c1814.appspot.com",
  messagingSenderId: "42601058369",
  appId: "1:42601058369:web:e59561a25cd78a0010f6c0",
  measurementId: "G-BHG86LRYDW",
};

firebase.initializeApp(firebaseConfig);
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(async (payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  console.log("\n\n this is payload -====>", payload);
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.message,
  };
  self.registration.showNotification(notificationTitle, notificationOptions);
});




const broadcast = new BroadcastChannel('c1');


self.addEventListener('activate', () => {
  console.log('\n\n firebase service worker activated');
  broadcast.postMessage({
    type: 'INIT',
  });
});




/*
firebase notification setup according to 

https://medium.com/@munnashisad/fcm-push-notification-in-next-js-app-using-custom-hook-d78494cb9e4f


*/
