"use client";
import React, { useEffect } from "react";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { getMessageClient } from "../util/firebase";

import { UserService, entity_FCMTokenInput } from "@/generated";
import { generateRandomString } from "@/util/helper";
import uuid from "react-uuid";
import { useRecoilState } from "recoil";
import { userState } from "@/util/state";

export default function FirebaseHandler() {
  const [userData, setUserData] = useRecoilState(userState);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const messaging = getMessageClient();
    if (!messaging) {
      return;
    }

    (async function () {
      const permission = await Notification.requestPermission();
      
      if (permission === "granted") {
        let currentToken = ""
        while(currentToken.length < 1){
          currentToken = await getToken(messaging, {
            vapidKey:
              "BFfZRXL870_o_p7fCkJEoT2MvcAoGesV57HBC8-cR4HZr30pVGYnbeiedho3Yzbbzp8iZYd_f5RwWPSUzJb4ato",
          }).catch((e) => console.log(e)) || "";

        }
      
        setUserData((s) => ({ ...s, fToken: currentToken }));
        console.log("This is current token==>", currentToken);
      }
    })();

    const unsubscribe = onMessage(messaging, (payload) => {
      console.log("Foreground push notification received:", payload);

      alert(JSON.stringify(payload));
    });
    return () => {
      console.log("unsubscribing for message");
      unsubscribe(); // Unsubscribe from the onMessage event
    };
  }, [setUserData]);

  // use Effect to save fcm token on server

  useEffect(() => {
    if (!userData.fToken) {
      return;
    }

    let deviceId = localStorage.getItem("deviceId");
    if (!deviceId) {
      deviceId = uuid();
      localStorage.setItem("deviceId", deviceId);
      console.log("\n\n Device id is --> ", deviceId);
    }
    UserService.postPUserSaveFbToken({ deviceId, token: userData.fToken }, "");
  }, [userData.fToken]);

  return <>fbtoken:{userData.fToken}</>;
}
