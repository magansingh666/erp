"use client";

import { ApiError, RosterService, entity_PunchInOutput, entity_PunchInInput } from "@/generated";
import { userState } from "@/util/state";
import { useState } from "react";
import { useMutation } from "react-query";
import { useRecoilValue } from "recoil";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const [locationId, setLocationId] = useState("");
  const [orgId, setOrgId] = useState("");
  const [timeStr, setTimeStr] = useState("");
  const t = new Date().toISOString();
  const [res, setRes] = useState("");
  const userData = useRecoilValue(userState)



  const mutation = useMutation({   
    mutationKey: ["punchInOutCreate"],
    mutationFn: (r: entity_PunchInInput) => RosterService.postPRosterPunchInOut("", r)   ,
    onSuccess: (data) => {
      console.log("Data Created is ==>", data);
      setRes(JSON.stringify(data))
    },
    onSettled: () => {setIsLoading(false)},
    onError : (err) =>  setRes(JSON.stringify(err))
  });

  return (
    <div className="">
      <h1>Enter Location Id and Time String. Then click Send button</h1>

      <div className="flex flex-col gap-2 max-w-md m-4">
        <p suppressHydrationWarning>Enter Location Id</p>
        <input
          type="text"
          value={locationId}
          onChange={(e1) => setLocationId(e1.target.value)}
          placeholder="Location Id"
          className="input input-bordered input-primary w-full  m-2"
        />
        <p suppressHydrationWarning>Time String in formate {t}</p>
        <input
          type="text"
          value={timeStr}
          onChange={(e1) => setTimeStr(e1.target.value)}
          placeholder="Time String in Iso Format"
          className="input input-bordered input-primary w-full m-2"
        />
      </div>

      <button
        disabled={isLoading}
        className="btn btn-outline m-4"
        onClick={() => {
          setIsLoading(true);
          mutation.mutate({locationId, createdAt : timeStr, userId : userData.id, orgId : userData.orgId })
        }}
      >
        Send
      </button>
      <br />
      <button className="btn btn-outline m-4" onClick={() => setRes("")}>Clear Error</button>
     
    </div>
  );
}
