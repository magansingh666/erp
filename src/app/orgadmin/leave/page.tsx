"use client";

import GenericTable from "@/components/genericTable";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { getOrgIdState } from "@/util/state";
import { useRecoilValue } from "recoil";
import { LeaveService, entity_LeaveOutput } from "@/generated";

export default function Page() {
    const [loading, setIsLoading] = useState(false)
  const searchParams = useSearchParams();
  const branchId = searchParams.get("branchId");
  const qClient = useQueryClient();
  const router = useRouter();
  const orgId = useRecoilValue(getOrgIdState);
  const [editItem, setEditItem] = useState<entity_LeaveOutput | undefined>(
    undefined
  );

  const [uiView, setUiview] = useState<"edit" | "list" | "new">("list");

  const { data: leaveList } = useQuery({
    queryKey: ["leaveList"],
    queryFn: () => LeaveService.postPLeaveGetAll(""),
  });

  const update = useMutation({
    mutationKey: ["updateLeave"],
    mutationFn: (r: entity_LeaveOutput) => LeaveService.postPLeaveUpdate(r),
    onSuccess: (data) => {
      console.log("Updated Data Received ==>", data);
      qClient.invalidateQueries({ queryKey: ["leaveList"] });
    },
    onSettled: () => setIsLoading(false),
  });


  async function actionHandler(r: entity_LeaveOutput, action: string) {
    console.log("Handler called in page", r, action);
    setEditItem(r);
    if (action === "approve") {
        update.mutate({status : "approved", id : r.id})

    }
    if (action === "reject") {
        update.mutate({status : "rejected", id : r.id})
        
    }
    if (action === "Delete") {
      // qClient.invalidateQueries({ queryKey: ["leaveList"] });
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

      {uiView === "list" && leaveList && leaveList.length > 0 && (
        <GenericTable
          data={leaveList}
          fn={actionHandler}
          actions={["approve", "reject"]}
        />
      )}

      <div>
       
      </div>
    </div>
  );
}
