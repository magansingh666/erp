"use client";

import { useEffect, useState } from "react";
import { RosterService } from "../generated";
import { useQuery } from "react-query";

import GenericTable from "./genericTable";

export default function RosterList() {
  const { data: rosterList } = useQuery({
    queryKey: "rosterList",
    queryFn: () => RosterService.postPRosterGetAll(""),
  });

  useEffect(() => {
    (async function () {
      console.log("App started");
    })();
  }, []);

  return (
    <div className="w-full m-2 p-2">
      <p className="m-4 text-4xl">Employee Roster List</p>
      {rosterList && <GenericTable data={rosterList} />}
    </div>
  );
}

/*

<div className="flex flex-row gap-4">
        {rosterList &&
          rosterList.map((e, i) => (
            <div className="border rounded-xl border-gray-700" key={i}>
              <p>
                {"ID: "}
                {e.id}
              </p>
              <p>
                {"UserId: "}
                {e.userId}
              </p>
              <p>
                {"LocationId: "}
                {e.locationId}
              </p>
              <p>
                {"StartTime: "}
                {e.startTime}
              </p>
              <p>
                {"EndTime: "}
                {e.endTime}
              </p>
            </div>
          ))}
      </div>

*/
