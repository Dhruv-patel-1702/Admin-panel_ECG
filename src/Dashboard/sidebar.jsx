import React, { useState } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PermContactCalendarIcon from "@mui/icons-material/PermContactCalendar";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import LockIcon from "@mui/icons-material/Lock";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddBoxIcon from '@mui/icons-material/AddBox';
const Sidebar = () => {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setIsLoggingOut(true);

    // Simulate a delay for logout process
    setTimeout(() => {
      localStorage.removeItem("token"); // Remove token from localStorage
      toast.success("Logout successfully!", {
        position: "bottom-right",
        autoClose: 3000,
      });
      setIsLoggingOut(false);
      navigate("/"); // Redirect to login page
    }, 1500); // Simulate a 1.5-second delay
  };

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
      icon: <AddBoxIcon />,
      text: " Plan",
      path: "/addplan",
    },
    { icon: <DashboardIcon />, text: "Coupon", path: "/coupon" },
    { icon: <ContactPhoneIcon />, text: "Contact Us", path: "/contactus" },
    { icon: <LockIcon />, text: "Change Password", path: "/ChangePassword" },
  ];

  return (
    <div className="w-[250px] h-[97vh] bg-[#28282b] p-4 flex flex-col mt-3 rounded-xl fixed ">
      <div className="flex items-center justify-center gap-3 px-3 mb-4">
        <Link to="/userlist">
          <h2 className="text-white/90 text-xl font-medium mt-2">ECG Admin</h2>
        </Link>
      </div>
      <nav className="flex-1 px-2">
        <ul>
          {menuItems.map((item, index) => (
            <li key={index} className="my-1">
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors  ${
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
        className="flex w-full bg-[#6178bc] text-white py-2 rounded-lg font-medium hover:bg-[#41507e] transition-colors space-x-3 items-center justify-center"
        onClick={handleLogout}
        disabled={isLoggingOut} // Disable button while logging out
      >
        {isLoggingOut ? (
          <span>Logging out...</span>
        ) : (
          <>
            <ExitToAppIcon />
            <p>LOGOUT</p>
          </>
        )}
      </button>
      {/* ToastContainer with higher z-index */}
      <ToastContainer
        style={{ zIndex: 9999 }} // Ensure the toast is above other elements
      />
    </div>
  );
};

export default Sidebar;
