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

const firebaseApp = initializeApp(firebaseConfig);
//export default firebaseApp;

export function getMessageClient() {
  try {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessaging(firebaseApp);
      console.log("\n firebase messaging client initialized", messaging)
      return messaging;
    }
  } catch (error) {
    console.log("An error occurred in get Messaging function ....", error);
  }
}

/*

let app: FirebaseApp;
export let messaging: Messaging;

if (typeof window !== "undefined") {
  app = initializeApp(firebaseConfig);
  messaging = getMessaging(app);
}

const key =
  "BFfZRXL870_o_p7fCkJEoT2MvcAoGesV57HBC8-cR4HZr30pVGYnbeiedho3Yzbbzp8iZYd_f5RwWPSUzJb4ato";

export async function getFCMToken() {
  const s = await getToken(messaging, { vapidKey: key })    
    .catch((err) => {
      console.log(err);
    });

  return s;
}







*/

// Initialize Firebase
