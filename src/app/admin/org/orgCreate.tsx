"use client";

import { useEffect, useState } from "react";
import { OrgService, entity_OrgCreateInput } from "../../../generated";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { userState } from "@/util/state";

export default function OrgCreate() {
  const userData = useRecoilValue(userState);
  const t = new Date().toISOString();
  const qClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  // const [phone, setPhone] = useState("");
  // const [orgType, setOrgType] = useState("")

  const mutation = useMutation({
    mutationKey: ["orgCreate"],
    mutationFn: (r: entity_OrgCreateInput) => OrgService.postPOrgCreate(r, ""),
    onSuccess: (data) => {
      console.log("Data Created is ==>", data);
      qClient.invalidateQueries({ queryKey: ["orgList"] });
    },
    onSettled: () => setIsLoading(false),
  });

  useEffect(() => {
    (async function () {
      console.log("Org Create Component loaded");
    })();
  }, [mutation]);

  return (
    <div className="max-w-xl m-2 p-2">
      <h1 className="m-4 text-4xl">Create New Org</h1>

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
            name, email, address
          });
        }}
      >
        Create
      </button>
    </div>
  );
}
