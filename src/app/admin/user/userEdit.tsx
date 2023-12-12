"use client";

import { useEffect, useState } from "react";
import {
  OrgService,
  UserService,
  entity_OrgCreateInput,
  entity_OrgCreateOutput,
  entity_UserCreateInput,
  entity_UserCreateOutput,
} from "../../../generated";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { userState } from "@/util/state";

export default function UserEdit(props: { data: entity_UserCreateOutput }) {
  const { data } = props;
  const userData = useRecoilValue(userState);
  const t = new Date().toISOString();
  const [isLoading, setIsLoading] = useState(false);
  const qClient = useQueryClient();

  const [firstName, setFirstName] = useState(data.firstName);
  const [email, setEmail] = useState(data.email);
  //const [address, setAddress] = useState(data.);
  //const [password, setPassword] = useState(data.);
  const [phone, setPhone] = useState(data.phone);
  const [systemRole, setSystemRole] = useState(data.systemRole as string);





  const mutation = useMutation({
    mutationKey: ["userEdit"],
    mutationFn: (r: entity_UserCreateOutput) => UserService.postPUserUpdate(r, ""),
    onSuccess: (data) => {
      console.log("Updated Data Received ==>", data);
      qClient.invalidateQueries({ queryKey: ["userList"] });
    },
    onSettled: () => setIsLoading(false),
  });

  useEffect(() => {
    (async function () {
      console.log("User Update component loaded");
    })();
  }, []);

  return (
    <div className="max-w-xl m-2 p-2">
      <h1 className="m-4 text-4xl">Edit User</h1>

      <div className="flex flex-col gap-2">

      <p suppressHydrationWarning>First Name</p>
        <input
          type="text"
          value={firstName}
          onChange={(e1) => setFirstName(e1.target.value)}
          placeholder="First Name"
          className="input input-bordered input-primary w-full  m-2"
        />
        <p suppressHydrationWarning>Email</p>
        <input
          type="text"
          value={email}
          onChange={(e1) => setEmail(e1.target.value)}
          placeholder="Email"
          className="input input-bordered input-primary w-full m-2"
        />

        

        <p suppressHydrationWarning>Phone</p>
        <input
          type="text"
          value={phone}
          onChange={(e1) => setPhone(e1.target.value)}
          placeholder="Phone"
          className="input input-bordered input-primary w-full m-2"
        />


        <p suppressHydrationWarning>System Role</p>
        <input
          type="text"
          value={systemRole}
          onChange={(e1) => setSystemRole(e1.target.value)}
          placeholder="System Role"
          className="input input-bordered input-primary w-full m-2"
        />
       



      </div>

      <button
        disabled={isLoading}
        className="btn btn-outline"
        onClick={() => {
          setIsLoading(true);
          mutation.mutate({
            id: data.id,
            firstName, email, phone, systemRole : systemRole as entity_UserCreateOutput.systemRole
          });
        }}
      >
        Update
      </button>
    </div>
  );
}
