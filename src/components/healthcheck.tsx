"use client";

import { useEffect } from "react";
import {
  OpenAPI,
  UserService,
  UtilityService,
  controller2_LoginParams,
} from "../generated";
import { useMutation, useQuery } from "react-query";
import { metadata } from "@/app/layout";

export default function HealthCheck() {
  const mutation = useMutation({
    mutationKey: "key1",
    mutationFn: () => {
      OpenAPI.TOKEN = "custom token 34";
      return UtilityService.getOHealthCheck("metadata")
    },
    onSuccess: (data) => console.log(data),
  });

  useEffect(() => {
    (async function () {
      console.log("App started");
    })();
  }, [mutation]);

  return (
    <div className="">
      <h1>HealthCheck</h1>
      <button
        onClick={() => {
          mutation.mutate();
        }}
      >
        HealthCheck
      </button>
    </div>
  );
}
