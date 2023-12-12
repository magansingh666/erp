"use client";

import { useSearchParams } from "next/navigation";

export default function Page() {
    const searchParams = useSearchParams()
    const branchId = searchParams.get("branchId")
  return (
    <div className="">
      <h1>Location in Branch{branchId}</h1>
    </div>
  );
}
