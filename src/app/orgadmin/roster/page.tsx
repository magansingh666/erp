"use client";

import GenericTable from "@/components/genericTable";
import RosterCreate from "@/app/orgadmin/roster/rosterCreate";
import RosterEdit from "@/app/orgadmin/roster/rosterEdit";
import { RosterService, entity_RosterCreateOutput } from "@/generated";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

export default function Page() {
  const qClient = useQueryClient()
  const [editItem, setEditItem] = useState<
    entity_RosterCreateOutput | undefined
  >();
  const [uiView, setUiview] = useState<"edit" | "list" | "new">("list");

  const { data: rosterList } = useQuery({
    queryKey: ["rosterList"],
    queryFn: () => RosterService.postPRosterGetAll(""),
  });

  async function actionHandler(r: entity_RosterCreateOutput, action: string) {
    console.log("Handler called in page", r, action);
    setEditItem(r);
    if (action === "Update") {
      setUiview("edit");
    }
    if (action === "Delete") {
      RosterService.postPRosterDelete(r , '');
      qClient.invalidateQueries({queryKey : "rosterList"})
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

      {uiView === "list" && rosterList && rosterList.length > 0 && (
        <GenericTable data={rosterList} fn={actionHandler} />
      )}

      <div>
        {uiView === "new" && <RosterCreate />}
        {uiView === "edit" && editItem && <RosterEdit data={editItem} />}
      </div>
    </div>
  );
}
