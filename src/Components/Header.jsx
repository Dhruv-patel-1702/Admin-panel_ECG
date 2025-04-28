import React from "react";

const Header = (props) => {
  return (
    <div className="mx-auto sticky top-0 z-10">
      <div className="flex justify-between items-center border-b-2 bg-white pt-5 border-gray-500 pb-2 ">
        <div>
          <h1 className="text-xl font-semibold">{props.name}</h1>
        </div>
      </div>
    </div>
  );
};

export default Header;
