// Import the functions you need from the SDKs you need
import { FirebaseApp, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Messaging, getMessaging, getToken } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAHANitseq1p_NVwIZcoogN6iamw4GC_Vo",
  authDomain: "erp-hrm-c1814.firebaseapp.com",
  projectId: "erp-hrm-c1814",
  storageBucket: "erp-hrm-c1814.appspot.com",
  messagingSenderId: "42601058369",
  appId: "1:42601058369:web:e59561a25cd78a0010f6c0",
  measurementId: "G-BHG86LRYDW",
};

// Initialize Firebase
let app: FirebaseApp;
let messaging: Messaging;

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

const key =   "BFfZRXL870_o_p7fCkJEoT2MvcAoGesV57HBC8-cR4HZr30pVGYnbeiedho3Yzbbzp8iZYd_f5RwWPSUzJb4ato";

export async function getFCMToken() {
  getToken(messaging, { vapidKey: key })
    .then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        console.log(currentToken);
      } else {
        // Show permission request UI
        console.log(
          "No registration token available. Request permission to generate one."
        );
        // ...
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // ...
    });
}
