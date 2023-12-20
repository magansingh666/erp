"use client";


import { UserService } from "../generated";
import {  useQuery } from "react-query";

import Login from "@/components/login";

import { useRecoilState, useRecoilValue } from "recoil";
import { logInDoneState, userState } from "@/util/state";
import OrgSelect from "@/components/orgSelect";

export default function HomePage() {
  
  const isLoginDone = useRecoilValue(logInDoneState);
  const [userData, setUser] = useRecoilState(userState); 

  useQuery({
    queryKey: "getUserData",
    queryFn: () => UserService.postPUserGet(""),
    enabled: userData.token.length > 10,
    onSuccess: (data) => {
      setUser((s) => ({
        ...s,
        firstName: data?.firstName || "",
        lastName: data?.lastName || "",
        systemRole: data?.systemRole || "",
        id: data?.id || "",
      }));
    },
  });

  

  return (
    <div className="flex min-h-screen flex-col items-stretch justify-between p-24">

      {!isLoginDone ? <Login /> : <OrgSelect />}
      
      
      
    </div>
  );
}
