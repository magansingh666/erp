"use client";

import GenericTable from "@/components/genericTable";
import RosterCreate from "@/app/orgadmin/roster/rosterCreate";
import RosterEdit from "@/app/orgadmin/roster/rosterEdit";
import {
  LocationService,
  RosterService,
  UserService,
  controller2_IdDataInput,
  entity_RosterCreateOutput,
  entity_UserCreateOutput,
} from "@/generated";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { getOne } from "@/util/helper";

interface RosterUIData {
  locationName: string;
  userName: string;
  startTime: string;
  endTime: string;
  userId : string;
  locationId: string;
  cameAt : string;
  leftAt : string;
}


export default function Page() {
  const qClient = useQueryClient();
  const [editItem, setEditItem] = useState<
    entity_RosterCreateOutput | undefined
  >();
  const [uiView, setUiview] = useState<"edit" | "list" | "new">("list");
  const [rosterUiDataArr, setArr] = useState<RosterUIData[] | undefined>();

  const { data: rosterList } = useQuery({
    queryKey: ["rosterList"],
    queryFn: () => RosterService.postPRosterGetAll(""),
  });

  const locationIds = rosterList?.map((e) => e.locationId);
  const userIds = rosterList?.map((e) => e.userId);
  

  const { data: userList1 } = useQuery({
    queryKey: ["userList1"],
    queryFn: () =>
      UserService.postPUserGetByIds("", { ids: userIds as string[] }),
    enabled: !!userIds,
  });

  const { data: locationList1 } = useQuery({
    queryKey: ["locationList1"],
    queryFn: () =>
      LocationService.postPOrgLocationGetByIds("", {
        ids: locationIds as string[],
      }),
    enabled: !!locationIds,
  });

  useEffect(() => {
    if (!rosterList || !locationList1 || !userList1) {
      return;
    }
    for (let r of rosterList) {
      const data: RosterUIData = {
        startTime: r.startTime || "",
        endTime: r.endTime || "",
        locationName:  getOne(locationList1, "id", r.locationId)?.name || "",
        userName: getOne(userList1, "id", r.userId)?.firstName || "",
        locationId : r.locationId || "",
        userId : r.userId || "",
        cameAt : r.cameAt || "",
        leftAt : r.LeftAt || ""
      };
      setArr( s =>  ([...s || [], data]))
    }
  }, [rosterList, locationList1, userList1]);

  async function actionHandler(r: entity_RosterCreateOutput, action: string) {
    console.log("Handler called in page", r, action);
    setEditItem(r);
    if (action === "Update") {
      setUiview("edit");
    }
    if (action === "Delete") {
      RosterService.postPRosterDelete(r, "");
      qClient.invalidateQueries({ queryKey: "rosterList" });
    }
  }

  return (
    <div className="">
      <div>
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

        {uiView === "list" && (
          <button
            onClick={() => {
              setEditItem(undefined);
              setUiview("new");
            }}
            className="btn btn-outline btn-xs m-2"
          >
            New
          </button>
        )}
      </div>

      {uiView === "list" && rosterUiDataArr && rosterUiDataArr.length > 0 && (
        <GenericTable data={rosterUiDataArr} fn={actionHandler} />
      )}

      <div>
        {uiView === "new" && <RosterCreate />}
        {uiView === "edit" && editItem && <RosterEdit data={editItem} />}
      </div>
      
    </div>
  );
}
