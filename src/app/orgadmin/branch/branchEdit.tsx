"use client";

import { useEffect, useState } from "react";
import {
  BranchService, entity_BranchCreateOutput
} from "../../../generated";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { getOrgIdState, userState } from "@/util/state";

export default function BranchEdit(props: { data: entity_OrgCreateOutput }) {
  const { data } = props;
  const orgId = useRecoilValue(getOrgIdState);
  const t = new Date().toISOString();
  const [isLoading, setIsLoading] = useState(false);
  const qClient = useQueryClient();

  const [name, setName] = useState(data?.name || "");
  const [phone, setPhone] = useState(data?.email || "");
  const [address, setAddress] = useState(data?.address || "");

  const mutation = useMutation({
    mutationKey: ["branchEdit"],
    mutationFn: (r: entity_BranchCreateOutput) => BranchService.postPOrgBranchCreate(r),
    onSuccess: (data) => {
      console.log("Updated Data Received ==>", data);
      qClient.invalidateQueries({ queryKey: ["branchList"] });
    },
    onSettled: () => setIsLoading(false),
  });

  useEffect(() => {
    (async function () {
      console.log("Branch Update component loaded");
    })();
  }, []);

  return (
    <div className="max-w-xl m-2 p-2">
      <h1 className="m-4 text-4xl">Edit Branch</h1>

      <div className="flex flex-col gap-2">
        <p suppressHydrationWarning>Name</p>
        <input
          type="text"
          value={name}
          onChange={(e1) => setName(e1.target.value)}
          placeholder="Org Name"
          className="input input-bordered input-primary w-full  m-2"
        />
        <p suppressHydrationWarning>Phone</p>
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
            id: data.id,
            name,
            phone,
            address, orgId
          });
        }}
      >
        Update
      </button>
    </div>
  );
}
