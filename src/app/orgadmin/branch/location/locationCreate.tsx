"use client";

import { useEffect, useState } from "react";
import {LocationService, entity_LocationCreateInput } from "../../../../generated";
import { useMutation, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { getOrgIdState } from "@/util/state";

export default function LocationCreate(props : {branchId : string}) {
  const orgId = useRecoilValue(getOrgIdState);
  
  const qClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
 
  const [description, setDescription] = useState("");
 

  const mutation = useMutation({
    mutationKey: ["locationCreate"],
    mutationFn: (r: entity_LocationCreateInput) =>  LocationService.postPOrgLocationCreate("", r)   ,
    onSuccess: (data) => {
      console.log("Data Created is ==>", data);
      qClient.invalidateQueries({ queryKey: ["locationList"] });
    },
    onSettled: () => setIsLoading(false),
  });

  useEffect(() => {
    (async function () {
      console.log("location Create Component loaded");
    })();
  }, [mutation]);

  return (
    <div className="max-w-xl m-2 p-2">
      <h1 className="m-4 text-4xl">Create New Location</h1>

      <div className="flex flex-col gap-2">
        <p suppressHydrationWarning>Enter Location Name</p>
        <input
          type="text"
          value={name}
          onChange={(e1) => setName(e1.target.value)}
          placeholder="Name"
          className="input input-bordered input-primary w-full  m-2"
        />
        

        <p suppressHydrationWarning>Description</p>
        <input
          type="text"
          value={description}
          onChange={(e1) => setDescription(e1.target.value)}
          placeholder="Description"
          className="input input-bordered input-primary w-full m-2"
        />
      </div>

      <button
        disabled={isLoading}
        className="btn btn-outline"
        onClick={() => {
          setIsLoading(true);
          mutation.mutate({
            name,  description, orgId , branchId : props.branchId
          });
        }}
      >
        Create
      </button>
    </div>
  );
}
