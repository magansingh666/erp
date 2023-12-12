"use client";

import GenericTable from "@/components/genericTable";

import { BranchService, entity_BranchCreateOutput } from "@/generated";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import { useRouter } from "next/navigation";
import { getOrgIdState } from "@/util/state";
import { useRecoilValue } from "recoil";
import BranchCreate from "./branchCreate";
import BranchEdit from "./branchEdit";


export default function Page() {
  const qClient = useQueryClient()
  const router = useRouter()
  const orgId = useRecoilValue(getOrgIdState)
  const [editItem, setEditItem] = useState<
    entity_BranchCreateOutput | undefined
  >();
  const [uiView, setUiview] = useState<"edit" | "list" | "new">("list");

  const { data: branchList } = useQuery({
    queryKey: ["branchList"],
    queryFn: () => BranchService.postPOrgBranchGetAll(orgId),
  });

  async function actionHandler(r: entity_BranchCreateOutput, action: string) {
    console.log("Handler called in page", r, action);
    setEditItem(r);
    if (action === "Update") {
      setUiview("edit");
    }
    if (action === "Delete") {
       //OrgService.postPOrgDelete()
      qClient.invalidateQueries({queryKey : ["branchList"]})
    }

    if (action === "Add Location") {
      router.push("/orgadmin/branch/location?branchId=" + r.id)
       
    
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

      {uiView === "list" && branchList && branchList.length > 0 && (
        <GenericTable data={branchList} fn={actionHandler} actions={["Add Location"]} />
      )}

      <div>
        {uiView === "new" && <BranchCreate />}
        {uiView === "edit" && editItem && <BranchEdit data={editItem} />}
      </div>
    </div>
  );
}
