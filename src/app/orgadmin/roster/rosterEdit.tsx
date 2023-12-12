"use client";

import { useEffect, useState } from "react";
import {
  LocationService,
  RosterService,
  UserService,
  entity_RosterCreateInput,
  entity_RosterCreateOutput,
} from "../../../generated";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { userState } from "@/util/state";

export default function RosterEdit(props: { data: entity_RosterCreateOutput }) {
  const { data } = props;
  const userData = useRecoilValue(userState);
  const t = new Date().toISOString();
  const [isLoading, setIsLoading] = useState(false);
  const qClient = useQueryClient();
  const [userId, setUserId] = useState<string>(data?.userId || "");
  const [locationId, setLocationId] = useState<string>(data?.locationId || "");
  const [startTime, setStartTime] = useState(data?.startTime || "");
  const [endTime, setEndTime] = useState(data?.endTime || "");

  const { data: userList } = useQuery({
    queryKey: "userList",
    queryFn: () => UserService.postPUserGetAll("", ""),
  });
  const { data: locationList } = useQuery({
    queryKey: "locationList",
    queryFn: () => LocationService.postPOrgLocationGetAll(""),
  });

  const mutation = useMutation({
    mutationKey: "rosterCreate",
    mutationFn: (r: entity_RosterCreateOutput) =>
      RosterService.postPRosterUpdate(r, ""),
    onSuccess: (data) => {
      console.log("Updated Data Received ==>", data);
      qClient.invalidateQueries({ queryKey: ["rosterList"] });
    },
    onSettled: () => setIsLoading(false),
  });

  useEffect(() => {
    (async function () {
      console.log("Roster Assign Component loaded");
    })();
  }, [mutation]);

  return (
    <div className="max-w-xl m-2 p-2">
      <h1 className="m-4 text-4xl">Edit Employee Roster</h1>

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

      <button
        disabled={isLoading}
        className="btn btn-outline"
        onClick={() => {
          setIsLoading(true);
          mutation.mutate({
            id : data.id,
            startTime,
            endTime,
            locationId,
            userId,
            orgId: userData.orgId,
          });
        }}
      >
        Update
      </button>
    </div>
  );
}
