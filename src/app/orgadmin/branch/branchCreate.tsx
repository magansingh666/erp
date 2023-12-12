"use client";

import { useEffect, useState } from "react";
import { BranchService, OrgService, entity_BranchCreateInput } from "../../../generated";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { getOrgIdState, userState } from "@/util/state";

export default function BranchCreate() {
  const orgId = useRecoilValue(getOrgIdState);
  const t = new Date().toISOString();
  const qClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  // const [phone, setPhone] = useState("");
  // const [orgType, setOrgType] = useState("")

  const mutation = useMutation({
    mutationKey: ["branchCreate"],
    mutationFn: (r: entity_BranchCreateInput) => BranchService.postPOrgBranchCreate(r)   ,
    onSuccess: (data) => {
      console.log("Data Created is ==>", data);
      qClient.invalidateQueries({ queryKey: ["branchList"] });
    },
    onSettled: () => setIsLoading(false),
  });

  useEffect(() => {
    (async function () {
      console.log("Branch Create Component loaded");
    })();
  }, [mutation]);

  return (
    <div className="max-w-xl m-2 p-2">
      <h1 className="m-4 text-4xl">Create New Branch</h1>

      <div className="flex flex-col gap-2">
        <p suppressHydrationWarning>Enter Branch name</p>
        <input
          type="text"
          value={name}
          onChange={(e1) => setName(e1.target.value)}
          placeholder="Branch Name"
          className="input input-bordered input-primary w-full  m-2"
        />
        <p suppressHydrationWarning>End Branch Phone</p>
        <input
          type="text"
          value={phone}
          onChange={(e1) => setPhone(e1.target.value)}
          placeholder="Phone"
          className="input input-bordered input-primary w-full m-2"
        />

        <p suppressHydrationWarning>Address</p>
        <input
          type="text"
          value={address}
          onChange={(e1) => setAddress(e1.target.value)}
          placeholder="Address"
          className="input input-bordered input-primary w-full m-2"
        />
      </div>

      <button
        disabled={isLoading}
        className="btn btn-outline"
        onClick={() => {
          setIsLoading(true);
          mutation.mutate({
            name,  phone, address, orgId
          });
        }}
      >
        Create
      </button>
    </div>
  );
}
