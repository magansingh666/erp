import { useEffect, useState } from "react";
import { getMessaging, getToken } from "firebase/messaging";
import { getMessageClient } from "../firebase/index";

const useFcm222Token = () => {
  const [token, setToken] = useState("");
  const [notificationPermissionStatus, setNotificationPermissionStatus] =
    useState("");

  useEffect(() => {
    console.log("\n executing fcm token use effect...");
    const retrieveToken = async () => {
      try {
        if (typeof window !== "undefined" && "serviceWorker" in navigator) {
          const messaging = getMessageClient();
          if (!messaging) {
            console.log("\n messaging not defined");
            return;
          }
          const permission = await Notification.requestPermission();
          setNotificationPermissionStatus(permission);
          if (permission === "granted") {
            const currentToken = await getToken(messaging, {
              vapidKey:
                "BFfZRXL870_o_p7fCkJEoT2MvcAoGesV57HBC8-cR4HZr30pVGYnbeiedho3Yzbbzp8iZYd_f5RwWPSUzJb4ato",
            }).catch((e) => console.log(e));
            console.log("\n This is fb token ==>", currentToken);
            if (currentToken) {
              setToken(currentToken);
            } else {
              console.log(
                "No registration token available. Request permission to generate one."
              );
            }
          }
        }
      } catch (error) {
        console.log(
          "An error occurred while retrieving token in file useFCMToken :",
          error
        );
      }
    };

    retrieveToken();
  }, []);

  return { fcmToken: token, notificationPermissionStatus };
};

