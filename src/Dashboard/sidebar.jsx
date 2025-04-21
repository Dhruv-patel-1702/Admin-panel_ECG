import React from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import DashboardIcon from "@mui/icons-material/Dashboard";
import FoodBankIcon from "@mui/icons-material/FoodBank";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    { icon: <DashboardIcon />, text: "ECG Dashboard", path: "/ecg_dashboard" },
    { icon: <PermContactCalendarIcon />, text: "User List", path: "/userlist" },
    { icon: <DevicesOtherIcon />, text: "Device List", path: "/devicelist" },
    {
      icon: <LocalDiningIcon />,
      text: "Food Preferences",
      path: "/foodpreferences",
    },
    {
      icon: <FoodBankIcon />,
      text: "Diet Preferences",
      path: "/dietpreferences",
    },
    { icon: <ContactPhoneIcon />, text: "Contact Us", path: "/contactus" },
  ];
  return (
    <div className="w-[270px] h-[97vh] bg-[#28282b] p-4 flex flex-col mt-3 ml-3 rounded-xl fixed ">
      <div className="flex items-center justify-center gap-3 px-3 mb-6 ">
        <Link to="/userlist">
          <h2 className="text-white/90 text-xl font-medium mt-2">ECG Admin</h2>
        </Link>
      </div>
      <nav className="flex-1 px-2">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="my-2">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? "bg-[#6178bc] text-white"
                      : "text-gray-400 hover:bg-white/10"
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-sm">{item.text}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      <button
        className="flex w-full bg-[#6178bc] text-white py-3 rounded-lg font-medium hover:bg-[#41507e] transition-colors space-x-3 items-center justify-center"
        onClick={() => navigate("/")}
      >
        <ExitToAppIcon />
        <p>LOGOUT</p>
      </button>
    </div>
  );
};

export default Sidebar;
