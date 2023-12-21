"use client";

import { UserService } from "../generated";
import { useQuery } from "react-query";

import Login from "@/components/login";

import { useRecoilState, useRecoilValue } from "recoil";
import { logInDoneState, userState } from "@/util/state";
import OrgSelect from "@/components/orgSelect";
import { getFCMToken, messaging } from "@/util/firebase";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onMessage } from "firebase/messaging";

export default function FirebaseHandler() {
  const router = useRouter();

  const [userData, setUser] = useRecoilState(userState);

  useEffect(() => {
    firebaseSetupTasks();
  }, [userData.id]);

  async function firebaseSetupTasks() {
    const token = (await getFCMToken()) || "";
    await UserService.postPUserSaveFbToken(
      { deviceId: "b09b6c80-f4a0-4a2e-a8ca-a28f43760199", token },
      ""
    );
    onMessage(messaging, (payload) => {
      console.log("Message received. ", payload);
      // ...
    });
  }

  return <></>;
}
