"use client";

import {
  RosterService,
  controller2_SendMeNotificationInput,
} from "@/generated";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";

import { useRecoilValue } from "recoil";
import { userState } from "@/util/state";
import useFcmToken from "@/util/hooks/useFCMToken";

export default function Page() {
  const [loading, setLoading] = useState(false);
  const t = new Date().toISOString();
  const userData = useRecoilValue(userState);
  const { fcmToken, notificationPermissionStatus } = useFcmToken();

  const qClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const mutation = useMutation({
    mutationKey: "sendNotificaitonToMe",
    mutationFn: (r: controller2_SendMeNotificationInput) =>
      RosterService.postPRosterSendMeNotification("", r),
    onSuccess: (data) => {
      console.log("received send notificaiton data  ==>", data);
    },
    onSettled: () => setLoading(false),
  });

  useEffect(() => {}, []);

  return (
    <div className="">
      <div>
        <div className="m-2">
          <p>Enter Notification title </p>
          <input
            type="text"
            value={title}
            onChange={(e1) => setTitle(e1.target.value)}
            placeholder="Enter Notification Title"
            className="input input-bordered input-primary max-w-md  m-2"
          />
          <br />
          <p>Enter Notification Text</p>
          <input
            type="text"
            value={message}
            onChange={(e1) => setMessage(e1.target.value)}
            placeholder="Enter Notification text content"
            className="input input-bordered input-primary max-w-md  m-2"
          />

          <p>Enter firebase Token for browser where you want to send notification</p>
          <input
            type="text"
            value={token}
            onChange={(e1) => setToken(e1.target.value)}
            placeholder="Enter Firebase token here"
            className="input input-bordered input-primary max-w-md  m-2"
          />

          <br />

          <button
            onClick={() => {
              setLoading(false);
              mutation.mutate({ title, message, token });
            }}
            className="btn btn-outline btn-xs m-2"
          >
            Send Notification to me
          </button>

          <p className="mt-8">Firebase Token for this browser</p>
          <textarea defaultValue={fcmToken} className="textarea resize m-4"></textarea>
        </div>
      </div>
    </div>
  );
}
