"use client";

import { useEffect, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { useRecoilValue } from "recoil";
import { userState } from "@/util/state";

import { UserService, entity_UserCreateInput } from "../../../generated";

export default function UserCreate() {
  const userData = useRecoilValue(userState);
  const t = new Date().toISOString();
  const qClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [systemRole, setSystemRole] = useState("");

  const mutation = useMutation({
    mutationKey: ["userCreate"],
    mutationFn: (r: entity_UserCreateInput) =>
      UserService.postOUserCreate(r, ""),
    onSuccess: (data) => {
      console.log("Data Created is ==>", data);
      qClient.invalidateQueries({ queryKey: ["userList"] });
    },
    onSettled: () => setIsLoading(false),
  });

  useEffect(() => {
    (async function () {
      console.log("User Create Component loaded");
    })();
  }, [mutation]);

  return (
    <div className="max-w-xl m-2 p-2">
      <h1 className="m-4 text-4xl">Create New User</h1>

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

        <p suppressHydrationWarning>Password</p>
        <input
          type="text"
          value={password}
          onChange={(e1) => setPassword(e1.target.value)}
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

        <p suppressHydrationWarning>Address</p>
        <input
          type="text"
          value={address}
          onChange={(e1) => setAddress(e1.target.value)}
          placeholder="Address"
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
            firstName,
            email,
            password, phone, systemRole : systemRole as entity_UserCreateInput.systemRole,
          });
        }}
      >
        Create
      </button>
    </div>
  );
}
