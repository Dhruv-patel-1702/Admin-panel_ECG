import React from "react";
import Sidebar from "../Dashboard/sidebar";
import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="flex justify-center items-center  bg-white w-full ">
      <div className="flex w-full px-4 h-screen ">
        <div className="w-[250px]">
          <Sidebar />
        </div>
        <div className="flex-1 px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
