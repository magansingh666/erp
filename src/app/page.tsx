"use client";


import { UserService } from "../generated";
import {  useQuery } from "react-query";

import Login from "@/components/login";

import { useRecoilState, useRecoilValue } from "recoil";
import { logInDoneState, userState } from "@/util/state";
import OrgSelect from "@/components/orgSelect";
import { getFCMToken, messaging } from "@/util/firebase";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { onMessage } from "firebase/messaging";

export default function HomePage() {
  const router = useRouter()
  
  
  const [userData, setUser] = useRecoilState(userState); 
  const [uiView, setUiView] = useState<"login"|"orgselect">("login")

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
       
       
       if(data?.systemRole as string == "ADMIN"){
        router.push("/dash")
        return
        
       }
       setUiView("orgselect")
    },
  
  });



  

  return (
    <div className="flex min-h-screen flex-col items-stretch justify-between p-24">

      {uiView == "login" && <Login /> }
      {uiView == "orgselect" && <OrgSelect /> }
      
      
      
    </div>
  );
}
