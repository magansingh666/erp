"use client";

import GenericTable from "@/components/genericTable";
import RosterCreate from "@/app/orgadmin/roster/rosterCreate";
import RosterEdit from "@/app/orgadmin/roster/rosterEdit";
import {
  LocationService,
  OrgService,
  RosterService,
  UserService,
  controller2_IdDataInput,
  entity_RosterCreateInput,
  entity_RosterCreateOutput,
  entity_UserCreateOutput,
} from "@/generated";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "react-query";
import { getOne } from "@/util/helper";
import { useRecoilValue } from "recoil";
import { userState } from "@/util/state";

interface RosterUIData {
  locationName: string;
  userName: string;
  startTime: string;
  endTime: string;
  userId: string;
  locationId: string;
  cameAt: string;
  leftAt: string;
  workMinutes: string;
}

export default function Page() {
  const [loading, setLoading] = useState(false);
  const t = new Date().toISOString();
  const userData = useRecoilValue(userState);
  const qClient = useQueryClient();
  const [editItem, setEditItem] = useState<
    entity_RosterCreateOutput | undefined
  >();

  const [rosterDataByUserId, setRosterDataByUserId] = useState<
    entity_RosterCreateOutput[] | undefined
  >();
  const [uiView, setUiview] = useState<"edit" | "list" | "new">("list");
  const [rosterUiDataArr, setArr] = useState<RosterUIData[] | undefined>();
  const [selectedUserId, setSelectedUserId] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [m, setM] = useState("");

  const [workingTime, setWorkingTime] = useState("");
  const [salary, setSalary] = useState("");

  const { data: orgUserList } = useQuery({
    queryKey: ["orgUserList"],
    queryFn: () => OrgService.postPOrgGetUsers({ id: userData.orgId }, ""),
  });

  const mutation = useMutation({
    mutationKey: "getRosterDataByUserId",
    mutationFn: () =>
      RosterService.postPRosterGetWorkingHour(
        { userId: selectedUserId, to: toDate, from: fromDate },
        ""
      ),
    onSuccess: (data) => {
      console.log("Working DATA by User Id is ==>", data);
      setWorkingTime(data?.workingTime || "")
      setSalary(data?.compensation || "")
      
    },
    onSettled: () => setLoading(false),
  });





  




  return (
    <div className="">
      <div>
        <p>Select User Id</p>
        <div className="m-4 p-4">
          {
            <select
              
              value={selectedUserId}
              className="select select-primary max-w-md  m-2"
              onChange={(event) => setSelectedUserId(event.target.value)}
            >
              <option value={""} key={"zero"}>
                {"==Select User Id=="}
              </option>
              {orgUserList &&
                orgUserList.map((e, i) => (
                  <option value={e.id} key={i}>
                    {e.firstName + " " + e.lastName}
                  </option>
                ))}
            </select>
          }
          <p suppressHydrationWarning>OR manually Enter User Id</p>
          <input
            type="text"
            value={selectedUserId}
            onChange={(e1) => setSelectedUserId(e1.target.value)}
            placeholder=""
            className="input input-bordered input-primary max-w-xl  m-2"
          />


          <p suppressHydrationWarning>From Date in format {t}</p>
          <input
            type="text"
            value={fromDate}
            onChange={(e1) => setFromDate(e1.target.value)}
            placeholder="Enter From Time"
            className="input input-bordered input-primary max-w-md  m-2"
          />

          <p suppressHydrationWarning>To Date in format {t}</p>
          <input
            type="text"
            value={toDate}
            onChange={(e1) => setToDate(e1.target.value)}
            placeholder="Enter End Time"
            className="input input-bordered input-primary max-w-md  m-2"
          />
          <br />
          <button
            onClick={() => {
              mutation.mutate();
            }}
            className="btn btn-outline btn-xs m-2"
          >
            Get Roster Data
          </button>
        </div>

        {(uiView === "edit" || uiView === "new") && (
          <button
            onClick={() => {
              setEditItem(undefined);
              setUiview("list");
            }}
            className="btn btn-outline btn-xs m-2"
          >
            Close
          </button>
        )}
      </div>
      

      <p>Working time : {workingTime || "zero"}</p>
      <p>Compensation : {salary || "zero"}</p>

      
    </div>
  );
}
