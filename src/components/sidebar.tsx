"use client";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { Menu, Xmark } from "iconoir-react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from "@/util/state";
import FirebaseHandler from "./firebaseHandler";

function LogoutButton() {
  const router = useRouter();
  const reset = useResetRecoilState(userState);

  return (
    <div
      className="mt-4 btn btn-info"
      onClick={() => {
        reset();
        router.push("/");
      }}
    >
      <a>LOGOUT</a>
    </div>
  );
}

function AdminMenuList(props: { handler: (b: boolean) => void }) {
  const router = useRouter();
  return (
    <>
      <ul className="menu">
        <li
          onClick={() => {
            router.push("/admin/org");
            props.handler(false);
          }}
        >
          {" "}
          <a>Organisation</a>
        </li>
        <li
          onClick={() => {
            router.push("/admin/user");
            props.handler(false);
          }}
        >
          <a>User</a>
        </li>
      </ul>
    </>
  );
}

function OrgUserMenuList(props: { handler: (b: boolean) => void }) {
  const router = useRouter();
  return (
    <>
      <ul className="menu">
        <li
          onClick={() => {
            router.push("/orguser/punchInOut");
            props.handler(false);
          }}
        >
          <a>Punch In Out</a>
        </li>

        <li
          onClick={() => {
            router.push("/orguser/leave");
            props.handler(false);
          }}
        >
          <a>Leave</a>
        </li>
      </ul>
    </>
  );
}

function OrgAdminMenuList(props: { handler: (b: boolean) => void }) {
  const router = useRouter();
  return (
    <>
      <ul className="menu">
        <li
          onClick={() => {
            router.push("/orgadmin/roster");
            props.handler(false);
          }}
        >
          <a>Roster</a>
        </li>

        <li
          onClick={() => {
            router.push("/orgadmin/rosterByUserId");
            props.handler(false);
          }}
        >
          <a>Roster by UserId</a>
        </li>

        <li
          onClick={() => {
            router.push("/orgadmin/branch");
            props.handler(false);
          }}
        >
          <a>Branch</a>
        </li>

        <li
          onClick={() => {
            router.push("/orgadmin/compensationByUserId");
            props.handler(false);
          }}
        >
          <a>Payment Calculation</a>
        </li>

        <li
          onClick={() => {
            router.push("/orgadmin/notification");
            props.handler(false);
          }}
        >
          <a>send me notification</a>
        </li>

        <li
          onClick={() => {
            router.push("/orgadmin/unsettled-punch");
            props.handler(false);
          }}
        >
          <a>Unsettled Punch In/Out Data</a>
        </li>

        <li
          onClick={() => {
            router.push("/orgadmin/leave");
            props.handler(false);
          }}
        >
          <a>Leave</a>
        </li>
      </ul>
    </>
  );
}

export default function Sidebar() {
  const router = useRouter();
  const pathName = usePathname();
  const [open, setOpen] = React.useState(false);
  const invisibleOnRoutes = ["/", "/signup"];
  const data = useRecoilValue(userState);

  if (invisibleOnRoutes.includes(pathName)) {
    return null;
  }

  return (
    <div>
      <div>
        {
          <div className="border-2 w-60 rounded-xl m-2 p-2 border-gray-700">
            {
              <p>
                {data.firstName} {data.systemRole}
              </p>
            }
          </div>
        }
      </div>
      {!open && (
        <div>
          <button
            className="btn btn-neutral fixed  z-30 flex items-center cursor-pointer right-2 top-2"
            onClick={() => setOpen((s) => !s)}
          >
            <Menu />
          </button>
        </div>
      )}

      <div
        className={`top-0 right-0 w-60 bg-slate-900 z-10 p-2 pl-4 text-white fixed h-full z-0  ease-in-out duration-300 ${
          open ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <h3 className="mt-2 mb-10 text-2xl">ERP</h3>
        {data?.systemRole === "ADMIN" && <AdminMenuList handler={setOpen} />}
        {data?.systemRole === "ORG_USER" && (
          <OrgUserMenuList handler={setOpen} />
        )}
        {data?.systemRole === "ORG_ADMIN" && (
          <OrgAdminMenuList handler={setOpen} />
        )}
        <LogoutButton />
        {open && (
          <div>
            {" "}
            <button
              className="btn flex text-4xl text-white items-center cursor-pointer fixed right-2 top-2 z-50"
              onClick={() => setOpen((s) => !s)}
            >
              <Xmark height={24} width={24} />
            </button>
          </div>
        )}
      </div>
      <FirebaseHandler />
    </div>
  );
}
