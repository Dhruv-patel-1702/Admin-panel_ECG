import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { Edit, Delete } from "@mui/icons-material";

const Addplan = () => {
  const [dietPlans, setDietPlans] = useState([]);
  const navigate = useNavigate();

  return (
    <div>
      <Header name="Add Plan" style={{ position: "fixed", top: 0, width: "100%", zIndex: 10 }} />
      
      <div className="flex justify-between items-center mb-5 px-3 mt-5">
        <h2 className="text-xl font-bold">Add Plan</h2>
        <button
          className="submit-button bg-[#6178bc] text-white py-2 px-4 rounded-lg hover:bg-[#50639e]"
          onClick={() => navigate("/createplan")}
        >
          Create Plan
        </button>
      </div>

      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {dietPlans.map((plan, index) => (
          <div
            key={index}
            className="relative shadow-md rounded-lg p-5 border border-gray-200 bg-white transition-colors"
          >
            {/* Icons on Top Right */}
            <div className="absolute top-3 right-3 flex space-x-2">
              <button className="text-blue-600 hover:text-blue-800 transition">
                <Edit fontSize="small" />
              </button>
              <button className="text-red-600 hover:text-red-800 transition">
                <Delete fontSize="small" />
              </button>
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-2">{plan.dietName}</h3>
            <p className="text-gray-600">{plan.dietDescription}</p>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Restrictions:</strong> {plan.restrictions}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Recommended Foods:</strong> {plan.recommendedFoods}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Health Conditions:</strong> {plan.healthConditions}
            </p>
            <p className="text-sm text-gray-500">
              <strong>Start Date:</strong> {plan.startDate}
            </p>
            <p className="text-sm text-gray-500">
              <strong>End Date:</strong> {plan.endDate}
            </p>
            <p
              className={`text-sm font-semibold mt-2 ${
                plan.status === "Active" ? "text-green-600" : "text-red-600"
              }`}
            >
              Status: {plan.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addplan;
