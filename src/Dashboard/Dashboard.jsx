import React from "react";
import Sidebar from "../Dashboard/sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center  bg-white w-full ">
      <div className="flex w-full px-3 gap-3 h-screen ">
        <div className="w-[270px]">
          <Sidebar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
