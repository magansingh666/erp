"use client";

import { useMutation, useQuery } from "react-query";

import { useRecoilState, useRecoilValue } from "recoil";
import { logInDoneState, tokenState, userState } from "@/util/state";
import { UserService } from "@/generated";

export default function DashPage() {
  const token = useRecoilValue(tokenState);
  const isLoginDone = useRecoilValue(logInDoneState);
  const [, setUser] = useRecoilState(userState);   UserService

  useQuery({
    queryKey: "getUserData",
    queryFn: () => UserService.postPUserGet(""),  
    enabled: isLoginDone,
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

  const mutation = useMutation({
    mutationKey: "getUserDatail",
    mutationFn: () => UserService.postPUserGet(""),
    onSuccess: (data) => console.log(data),
  });

  return (
    <div className="flex min-h-screen flex-col items-stretch justify-between p-24">
      <p className="text-3xl">Dashboard</p>
    </div>
  );
}
