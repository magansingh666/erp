"use client";

import { useEffect, useState } from "react";
import {
  LocationService,
  RosterService,
  UserService,
  entity_RosterCreateInput,
} from "../../../generated";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { userState } from "@/util/state";

export default function RosterCreate() {
  const userData = useRecoilValue(userState);
  const t = new Date().toISOString();
  const [userId, setUserId] = useState<string>("");
  const [locationId, setLocationId] = useState<string>("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [isLoading, setIsLoading] = useState(false)
  const qClient = useQueryClient()

  const { data: userList } = useQuery({
    queryKey: "userList",
    queryFn: () => UserService.postPUserGetAll(""),
  });
  const { data: locationList } = useQuery({
    queryKey: "locationList",
    queryFn: () => LocationService.postPOrgLocationGetAll(""),
  });

  const mutation = useMutation({
    mutationKey: "rosterCreate",
    mutationFn: (r: entity_RosterCreateInput) =>
      RosterService.postPRosterCreate(r, ""),
    onSuccess: (data) => {console.log("Data Created is ==>", data); qClient.invalidateQueries({queryKey : ["rosterList"]})},
    onSettled : () => setIsLoading(false)
  });

  useEffect(() => {
    (async function () {
      console.log("Roster Assign Component loaded");
    })();
  }, [mutation]);

  return (
    <div className="max-w-xl m-2 p-2">
      <h1 className="m-4 text-4xl">Create New Employee Roster</h1>

      <div className="flex flex-col gap-2">
        <p>Select User Id[Selected User Id : {userId}]</p>
        {
          <select
            placeholder="Select User Id"
            className="select select-primary w-full  m-2"
            onChange={(event) => setUserId(event.target.value)}
          >
            <option value={""} key={"zero"}>
              {"==Select User Id=="}
            </option>
            {userList &&
              userList.map((e, i) => (
                <option value={e.id} key={i}>
                  {e.firstName + " " + e.lastName}
                </option>
              ))}
          </select>
        }

        <p>Select Location Id [Selected Location Id : {locationId}]</p>
        {
          <select
            placeholder="Select Location Id"
            className="select select-primary w-full  m-2"
            onChange={(event) => setLocationId(event.target.value)}
          >
            <option value={""} key={"zero"}>
              {"==Select Location Id=="}
            </option>
            {locationList &&
              locationList.map((e, i) => (
                <option value={e.id} key={i}>
                  {e.name}
                </option>
              ))}
          </select>
        }

        <p suppressHydrationWarning>Start Time in format {t}</p>
        <input
          type="text"
          value={startTime}
          onChange={(e1) => setStartTime(e1.target.value)}
          placeholder="Start Time"
          className="input input-bordered input-primary w-full  m-2"
        />
        <p suppressHydrationWarning>End Time in format {t}</p>
        <input
          type="text"
          value={endTime}
          onChange={(e1) => setEndTime(e1.target.value)}
          placeholder="End Time"
          className="input input-bordered input-primary w-full m-2"
        />
      </div>

      <button disabled={isLoading}
        className="btn btn-outline"
        onClick={() => {
          setIsLoading(true);
          mutation.mutate({
            startTime,
            endTime,
            locationId,
            userId,
            orgId: userData.orgId,
          });
        }}
      >
        Assign
      </button>
    </div>
  );
}
