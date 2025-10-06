"use client";

import { NextPage } from "next";
import { redirect } from "next/navigation";

const Manage: NextPage = () => {
  return redirect("/manage/account");
};

export default Manage;
