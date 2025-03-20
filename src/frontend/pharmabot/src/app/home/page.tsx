"use client";

import SidebarActions from "../components/home/sidebar-actions";
import StatusCard from "../components/home/status-card";
import { redirect } from "next/navigation";

export default function Home() {
  const navigate = (path: string) => {
    redirect(path);
  };

  return (
    <div className="bg-[#FBFBFB] w-full h-full pl-8 pr-8">
      <div className="flex flex-col w-full h-[275px] items-center justify-center">
        <img
          src="./pharmatech-logo-lg.svg"
          alt="Logo PharmaTech"
          className="w-[668px] h-[183px] object-cover"
        />
      </div>
      <div className="flex flex-row gap-x-4">
        <div className="flex flex-col w-[33%] justify-center items-center">
          <SidebarActions />
        </div>
        <div className="flex flex-col w-[100%]items-center bg-white rounded-md shadow-md w-[100%] h-[100%] pl-16 pr-16 pt-4 pb-4">
          <div className="flex flex-row w-[100%] justify-between">
            <StatusCard
              urgency={0}
              quantity={21}
              onClick={() => {
                navigate("/");
              }}
            />
            <StatusCard
              urgency={1}
              quantity={39}
              onClick={() => {
                navigate("/");
              }}
            />
            <StatusCard
              urgency={2}
              quantity={10}
              onClick={() => {
                navigate("/");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
