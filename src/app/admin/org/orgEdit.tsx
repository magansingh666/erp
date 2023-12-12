"use client";

import { useEffect, useState } from "react";
import {
  OrgService,
  entity_OrgCreateInput,
  entity_OrgCreateOutput,
} from "../../../generated";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { userState } from "@/util/state";

export default function OrgEdit(props: { data: entity_OrgCreateOutput }) {
  const { data } = props;
  const userData = useRecoilValue(userState);
  const t = new Date().toISOString();
  const [isLoading, setIsLoading] = useState(false);
  const qClient = useQueryClient();

  const [name, setName] = useState(data?.name || "");
  const [email, setEmail] = useState(data?.email || "");
  const [address, setAddress] = useState(data?.address || "");

  const mutation = useMutation({
    mutationKey: ["orgEdit"],
    mutationFn: (r: entity_OrgCreateOutput) => OrgService.postPOrgUpdate(r, ""),
    onSuccess: (data) => {
      console.log("Updated Data Received ==>", data);
      qClient.invalidateQueries({ queryKey: ["orgList"] });
    },
    onSettled: () => setIsLoading(false),
  });

  useEffect(() => {
    (async function () {
      console.log("Org Update component loaded");
    })();
  }, []);

  return (
    <div className="max-w-xl m-2 p-2">
      <h1 className="m-4 text-4xl">Edit Org</h1>

      <div className="flex flex-col gap-2">
        <p suppressHydrationWarning>Enter Org name</p>
        <input
          type="text"
          value={name}
          onChange={(e1) => setName(e1.target.value)}
          placeholder="Org Name"
          className="input input-bordered input-primary w-full  m-2"
        />
        <p suppressHydrationWarning>End Org Email</p>
        <input
          type="text"
          value={email}
          onChange={(e1) => setEmail(e1.target.value)}
          placeholder="End Time"
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
            email,
            address,
          });
        }}
      >
        Update
      </button>
    </div>
  );
}
