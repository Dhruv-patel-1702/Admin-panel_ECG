import React, { useState, useEffect } from "react";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Header = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState("Dhruv Patel");

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  const handleClickOutside = (event) => {
    if (showDropdown && !event.target.closest('.dropdown')) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="fixed top-0  z-10 w-[82%] mt-3  bg-white">
      <div className="flex justify-between items-center border-b-2 border-gray-500 pb-2">
        <div>
        <h1 className="text-xl font-semibold">{props.name}</h1>
        </div>
        <div className="flex items-center space-x-4 ">
          <div className="relative dropdown">
            <div onClick={() => setShowNotifications(!showNotifications)}>
              <NotificationsIcon
                className="border-2 border-[#b8b8b8] rounded-md"
                style={{ color: "#1a73e8" }}
              />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                2
              </span>
            </div>
          </div>
          <div className="relative dropdown">
            <div
              className="flex items-center gap-2 border-2 border-[#b8b8b8] rounded-md p-1 cursor-pointer z-10"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <PersonIcon
                style={{ color: "#1a73e8" }}
                className="border-2 border-[#b8b8b8] rounded-md"
              />
              <span className="text-sm">{selectedOption}</span>
              <ArrowDropDownIcon />
            </div>

            {showDropdown && (
              <div className="absolute right-0 w-36 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-200">
                <button
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => handleOptionClick("Profile")}
                >
                  Profile
                </button>
                <button
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => handleOptionClick("Change Password")}
                >
                  Change Password
                </button>
                <button
                  className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  onClick={() => handleOptionClick("Logout")}
                >
                  Logout
                </button>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
