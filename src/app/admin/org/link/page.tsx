"use client";

import GenericTable from "@/components/genericTable";

import { OrgService, UserService, entity_UserCreateOutput } from "@/generated";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useParams, useSearchParams } from "next/navigation";

import { useRouter } from "next/navigation";

export default function LinkUserToOrg() {
  const qClient = useQueryClient();
  const router = useRouter();

  const searchParams = useSearchParams();
  const orgId = searchParams.get("orgId") || "";
  const [userId, setUserId] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [editItem, setEditItem] = useState<
    entity_UserCreateOutput | undefined
  >();

  const { data: orgUserList } = useQuery({
    queryKey: ["orgUserList"],
    queryFn: () => OrgService.postPOrgGetUsers({ id: orgId }, ""),
  });

  const { data: userList } = useQuery({
    queryKey: ["userList"],
    queryFn: () => UserService.postPUserGetAll(""),
  });

  const mutation = useMutation({
    mutationKey: ["linkUserToOrg"],
    mutationFn: () => OrgService.postPOrgAddUser({ userId, orgId }, ""),
    onSuccess: (data) => {
      console.log(data);
      qClient.invalidateQueries({queryKey : ['orgUserList']})
    },
    onSettled: () => {setIsLoading(false)},
  });
 

  const mutation2 = useMutation({
    mutationKey: ["unlinkUserToOrg"],
    mutationFn: (u :string ) => OrgService.postPOrgRemoveUser({ userId : u, orgId },),
    onSuccess: (data) => {
      console.log(data);
      qClient.invalidateQueries({queryKey : ['orgUserList']})
    },
    onSettled: () => {setIsLoading(false)},
  });

  async function actionHandler(r: entity_UserCreateOutput, action: string) {
    console.log("Handler called in page", r, action);
    setEditItem(r);
    if (action === "Remove User") {
      setIsLoading(true);
      if(r.id){
        mutation2.mutate(r.id);

      }
      
    }
  }

  return (
    <div className="">
      <div className="max-w-md m-4">
        <p>Select User To Link </p>
        {
          <select
            placeholder="Select User"
            className="select select-primary w-full  m-2"
            onChange={(event) => setUserId(event.target.value)}
          >
            <option value={""} key={"zero"}>
              {"==Select User Id=="}
            </option>
            {userList &&
              userList.map((e, i) => (
                <option value={e.id} key={i}>
                  {e.firstName + " " + e.lastName}
                </option>
              ))}
          </select>
        }
        <p>Id : {userId}</p>

        <button
          disabled={isLoading}
          className="btn btn-outline m-2"
          onClick={() => {
            setIsLoading(true);
            mutation.mutate();
          }}
        >
          Link
        </button>
      </div>

      {orgUserList && orgUserList.length > 0 && (
        <GenericTable data={orgUserList} fn={actionHandler} actions={["Remove User"]} />
      )}
    </div>
  );
}
