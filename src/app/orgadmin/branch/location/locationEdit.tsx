"use client";

import { useEffect, useState } from "react";
import {
LocationService, entity_LocationCreateOutput
} from "../../../../generated";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { getOrgIdState } from "@/util/state";

export default function LocationEdit(props: { data: entity_LocationCreateOutput }) {
  const { data } = props;
  const orgId = useRecoilValue(getOrgIdState);

  const [isLoading, setIsLoading] = useState(false);
  const qClient = useQueryClient();


  const [name, setName] = useState(data?.name || ""); 
  const [description, setDescription] = useState(data?.description || "");

  const mutation = useMutation({
    mutationKey: ["locationEdit"],
    mutationFn: (r: entity_LocationCreateOutput) => LocationService.postPOrgLocationUpdate("", r)   ,
    onSuccess: (data) => {
      console.log("Updated Data Received ==>", data);
      qClient.invalidateQueries({ queryKey: ["locationList"] });
    },
    onSettled: () => setIsLoading(false),
  });

  useEffect(() => {
    (async function () {
      console.log("location Update component loaded");
    })();
  }, []);

  return (
    <div className="max-w-xl m-2 p-2">
      <h1 className="m-4 text-4xl">Location in Branch</h1>

      <div className="flex flex-col gap-2">
        <p suppressHydrationWarning>Name</p>
        <input
          type="text"
          value={name}
          onChange={(e1) => setName(e1.target.value)}
          placeholder="Org Name"
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
            id: data.id,
            name,
           description, orgId
          });
        }}
      >
        Update
      </button>
    </div>
  );
}
