"use client";

import GenericTable from "@/components/genericTable";


import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getOrgIdState } from "@/util/state";
import { useRecoilValue } from "recoil";
import { entity_LocationCreateOutput , LocationService} from "@/generated";
import LocationCreate from "./locationCreate";
import LocationEdit from "./locationEdit";

export default function Page() {
  const searchParams = useSearchParams();
  const branchId = searchParams.get("branchId");
  const qClient = useQueryClient();
  const router = useRouter();
  const orgId = useRecoilValue(getOrgIdState);
  const [editItem, setEditItem] = useState<entity_LocationCreateOutput | undefined   
>(undefined);
  

  const [uiView, setUiview] = useState < "edit" | "list" | "new" >("list");


  const { data: locationList } = useQuery({
    queryKey: ["locationList"],
    queryFn: () => LocationService.postPOrgLocationGetAll("")   ,
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

      {uiView === "list" && locationList && locationList.length > 0 && (
        <GenericTable
          data={locationList}
          fn={actionHandler}
          actions={[]}
        />
      )}

      <div>
        {uiView === "new" && <LocationCreate branchId={branchId || ""} />}
        {uiView === "edit" && editItem && <LocationEdit data={editItem} />}
      </div>
    </div>
  );
}
