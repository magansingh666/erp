"use client";

import { useEffect, useState } from "react";
import {
  OpenAPI,
  OrgService,
  UserService,
  controller2_LoginParams,
  entity_OrgCreateOutput,
} from "../generated";
import { useMutation, useQuery } from "react-query";
import { useRecoilState } from "recoil";
import { userState } from "@/util/state";
import { useRouter } from "next/navigation";

export default function OrgSelect() {
  const router = useRouter();
  const [userData, setUserData] = useRecoilState(userState);
  const [selectedOrgId, setSelectedOrgId] = useState("");

  const { data: linkedOrgs } = useQuery({
    queryKey: "getLinkedOrgsOfUser",
    queryFn: () => OrgService.postPOrgGetLinkedOrg(""),
    enabled: !!userData.id && userData.systemRole != "ADMIN",
  });

  useEffect(() => {
    (async function () {
      console.log("Org Select Component Loaded");
    })();
  }, []);

  if (!userData.id) {
    return <></>;
  }
  if (userData?.systemRole === "ADMIN") {
    router.push("/dash");
  }

  return (
    <div className="border  rounded-2xl p-2 flex flex-col items-center">
      <p className="text-center text-3xl">Select Organization</p>
      { (
        <select
          value={selectedOrgId}
          placeholder="Select Organization"
          className="select select-primary max-w-xl  m-2"
          onChange={(event) => {
            event.preventDefault();
            setSelectedOrgId(event.target.value);           
            setUserData((s) => ({ ...s, orgId: event.target.value || "" }));
            
          }}
        >
          <option value={""} key={"zero"}>
            {"=Select Org="}
          </option>
          {Array.isArray(linkedOrgs) &&
            linkedOrgs.map((e, i) => (
              <option value={e.id} key={i}>
                {e.name}
              </option>
            ))}
        </select>
      )}
      <div className="w-full">
      <p>Selected Org Id : {userData.orgId}</p>

      </div>
      
      <button
        className="btn btn-outline "
        onClick={(e1) => {
          e1.preventDefault();
          router.push("/dash");
          
        }}
      >
        Go To Dashboard
      </button>
    </div>
  );
}
