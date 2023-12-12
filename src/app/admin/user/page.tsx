"use client";

import GenericTable from "@/components/genericTable";

import { UserService, entity_UserCreateOutput } from "@/generated";
import { useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import UserCreate from "./userCreate";
import UserEdit from "./userEdit";
import { useRouter } from "next/navigation";

export default function UserPage() {
  const qClient = useQueryClient();
  const router = useRouter();

  const [editItem, setEditItem] = useState<
    entity_UserCreateOutput | undefined
  >();
  const [uiView, setUiview] = useState<"edit" | "list" | "new">("list");

  const { data: userList } = useQuery({
    queryKey: ["userList"],
    queryFn: () => UserService.postPUserGetAll(""),
  });

  async function actionHandler(r: entity_UserCreateOutput, action: string) {
    console.log("Handler called in page", r, action);
    setEditItem(r);
    if (action === "Update") {
      setUiview("edit");
    }
    if (action === "Delete") {
      //OrgService.postPOrgDelete()
      qClient.invalidateQueries({ queryKey: ["userList"] });
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

      {uiView === "list" && userList && userList.length > 0 && (
        <GenericTable data={userList} fn={actionHandler}  />
      )}

      <div>
        {uiView === "new" && <UserCreate />}
        {uiView === "edit" && editItem && <UserEdit data={editItem} />}
      </div>
    </div>
  );
}
