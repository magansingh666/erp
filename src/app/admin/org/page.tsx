"use client";

import GenericTable from "@/components/genericTable";

import { OrgService , UserService, entity_OrgCreateInput, entity_OrgCreateOutput, entity_UserInOrgCreateOutput } from "@/generated";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import OrgCreate from "./orgCreate";
import OrgEdit from "./orgEdit";
import { useRouter } from "next/navigation";

export default function Page() {
  const qClient = useQueryClient()
  const router = useRouter()
  const [editItem, setEditItem] = useState<
    entity_OrgCreateOutput | undefined
  >();
  const [uiView, setUiview] = useState<"edit" | "list" | "new">("list");

  const { data: rosterList } = useQuery({
    queryKey: ["orgList"],
    queryFn: () => OrgService.postPOrgGetAll(""),
  });

  async function actionHandler(r: entity_OrgCreateOutput, action: string) {
    console.log("Handler called in page", r, action);
    setEditItem(r);
    if (action === "Update") {
      setUiview("edit");
    }
    if (action === "Delete") {
       //OrgService.postPOrgDelete()
      qClient.invalidateQueries({queryKey : ["orgList"]})
    }
    if (action === "Link User") {
      router.push("/admin/org/link?orgId=" + r.id)
      
     
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
        <GenericTable data={rosterList} fn={actionHandler} actions={["Link User"]} />
      )}

      <div>
        {uiView === "new" && <OrgCreate />}
        {uiView === "edit" && editItem && <OrgEdit data={editItem} />}
      </div>
    </div>
  );
}
