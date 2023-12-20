"use client";

import { useEffect, useState } from "react";
import { OpenAPI, UserService, controller2_LoginParams } from "../generated";
import { useMutation, useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { userState } from "@/util/state";
import { getFCMToken } from "@/util/firebase";

export default function Login() {
  const [params, setParams] = useState<controller2_LoginParams>({
    email: "admin1@gmail.com",
    password: "password",
    otp: "",
  });
  const [userData, setUserData] = useRecoilState(userState);
  const mutation = useMutation({
    mutationKey: "key1",
    mutationFn: (l: controller2_LoginParams) =>
      UserService.postOUserLogin(l, ""),
    onSuccess: (data) => {
      
      OpenAPI.TOKEN = data.token;
      setUserData((s) => ({ ...s, token: data.token || "" }));
    },
  });

  useEffect(() => {
    (async function () {
      console.log("Login Component Loaded");
      getFCMToken()
    })();
  }, [mutation]);

  return (
    <div className="flex flex-col gap-4 border items-center rounded-2xl p-2">
      <p className="text-center text-3xl">Login</p>
      <input
        type="text"
        value={params["email"]}
        onChange={(e1) => setParams((s) => ({ ...s, email: e1.target.value }))}
        placeholder="Email"
        className=" input input-bordered input-primary w-full max-w-xs"
      />
      <input
        type="text"
        value={params["password"]}
        onChange={(e1) =>
          setParams((s) => ({ ...s, password: e1.target.value }))
        }
        placeholder="Password"
        className="input input-bordered input-primary w-full max-w-xs"
      />

      <button
        className="btn btn-outline  w-full max-w-xs"
        onClick={(e1) => {
          e1.preventDefault();
          mutation.mutate(params);
        }}
      >
        Login
      </button>
    </div>
  );
}
