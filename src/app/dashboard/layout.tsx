"use client";
import React, { Suspense } from "react";

const DashboardLayout = ({
  children,
  chat,
  options,
}: {
  children: React.ReactNode;
  chat: React.ReactNode;
  options: React.ReactNode;
}) => {
  return (
    <div className="flex-col lg:flex-row flex mt-20 gap-4 w-full h-[91dvh] p-4 ">
      <Suspense>{chat}</Suspense>

      <Suspense>{children}</Suspense>
      <Suspense>{options}</Suspense>
    </div>
  );
};

export default DashboardLayout;
