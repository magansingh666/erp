"use client";

import GenericTable from "@/components/genericTable";


import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getOrgIdState, userState } from "@/util/state";
import { useRecoilValue } from "recoil";
import { entity_LocationCreateOutput , LocationService, RosterService} from "@/generated";


export default function Page() {
  const userData = useRecoilValue(userState)
  const searchParams = useSearchParams();
  const branchId = searchParams.get("branchId");
  const qClient = useQueryClient();
  const router = useRouter();
  const orgId = useRecoilValue(getOrgIdState);
  const [editItem, setEditItem] = useState<entity_LocationCreateOutput | undefined   
>(undefined);
  

  const [uiView, setUiview] = useState < "edit" | "list" | "new" >("list");


  const { data: unsettledPunchList } = useQuery({
    queryKey: ["unsettledPunchingList"],
    queryFn: () => RosterService.postPRosterGetUnsettledPuchInOut("", {"id" : userData.orgId})   ,
  });

  async function actionHandler(r: entity_LocationCreateOutput, action: string) {
    console.log("Handler called in page", r, action);
    setEditItem(r);
    if (action === "Update") {
      setUiview("edit");
    }
    if (action === "Delete") {
      LocationService.postPOrgLocationDelete(r.id || "", "")
      
      qClient.invalidateQueries({ queryKey: ["branchList"] });
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

      {uiView === "list" && unsettledPunchList && unsettledPunchList.length > 0 && (
        <GenericTable
          data={unsettledPunchList}
          fn={actionHandler}
          actions={[]}
        />
      )}

     
    </div>
  );
}
