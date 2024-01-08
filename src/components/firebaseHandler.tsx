"use client";
import React, { useEffect } from "react";
import { getMessaging, onMessage, getToken } from "firebase/messaging";
import { getMessageClient } from "../util/firebase";
import useFcmToken from "@/util/hooks/useFCMToken";
import { UserService, entity_FCMTokenInput } from "@/generated";
import { generateRandomString } from "@/util/helper";
import uuid from "react-uuid";
import { useRecoilState } from "recoil";
import { userState } from "@/util/state";

export default function FirebaseHandler() {
  const [userData, setUserData] = useRecoilState(userState);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      const messaging = getMessageClient();
      if (!messaging) {
        return;
      }

      const broadcast = new BroadcastChannel("c1");
      (async () => {
        await getToken(messaging, {
          vapidKey:
            "BFfZRXL870_o_p7fCkJEoT2MvcAoGesV57HBC8-cR4HZr30pVGYnbeiedho3Yzbbzp8iZYd_f5RwWPSUzJb4ato",
        }).catch((e1) => console.log("This is e1 ==>", e1));
      })();

      const tokenInit = async function () {
        const permission = await Notification.requestPermission();
        if (permission === "granted") {
          const currentToken = await getToken(messaging, {
            vapidKey:
              "BFfZRXL870_o_p7fCkJEoT2MvcAoGesV57HBC8-cR4HZr30pVGYnbeiedho3Yzbbzp8iZYd_f5RwWPSUzJb4ato",
          }).catch((e) => console.log(e));
          setUserData((s) => ({ ...s, fToken: currentToken || "" }));
        }
      };

      broadcast.onmessage = (event) => {
        console.log("\n\n response of bradcase channelr .....=>", event);
        tokenInit();
      };

      const unsubscribe = onMessage(messaging, (payload) => {
        console.log("Foreground push notification received:", payload);

        alert(JSON.stringify(payload));
      });
      return () => {
        console.log("unsubscribing for message");
        unsubscribe(); // Unsubscribe from the onMessage event
      };
    }
  }, [setUserData]);

  // use Effect to save fcm token on server

  useEffect(() => {
    if (!userData.fToken) {
      return;
    }
    if (typeof window != "undefined") {
      let deviceId = localStorage.getItem("deviceId");
      if (!deviceId) {
        deviceId = uuid();
        localStorage.setItem("deviceId", deviceId);
        console.log("\n\n Device id is --> ", deviceId);
      }
      UserService.postPUserSaveFbToken(
        { deviceId, token: userData.fToken },
        ""
      );
    }
  }, [userData.fToken]);

  return <></>;
}
