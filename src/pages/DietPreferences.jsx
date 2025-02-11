import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { Edit, Delete } from "@mui/icons-material";

const DietPreferences = () => {
  // State to hold diet preferences
  const [dietName, setDietName] = useState("");
  const [dietDescription, setDietDescription] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [recommendedFoods, setRecommendedFoods] = useState("");
  const [healthConditions, setHealthConditions] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("Active");
  const [dietPlans, setDietPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const addDietPlan = (newPlan) => {
    setDietPlans([...dietPlans, newPlan]);
    setDietName("");
    setDietDescription("");
    setRestrictions("");
    setRecommendedFoods("");
    setHealthConditions("");
    setStartDate("");
    setEndDate("");
    setStatus("Active");
    setIsModalOpen(false);
  };

  return (
    <div className={`mt-20 ${isModalOpen ? "overflow-hidden" : ""}`}>
      <Header name="Diet Preferences" style={{ position: "fixed", top: 0, width: "100%", zIndex: 10 }} />
      <div className="flex justify-between items-center mb-5 px-6">
        <h2 className="text-xl font-bold mb-4">Add Diet Preference</h2>
        <button
          className="submit-button bg-[#6178bc] text-white py-2 px-4 rounded-lg hover:bg-[#50639e]"
          onClick={() => navigate("/adddiet")}
        >
          Add Diet Plan
        </button>
      </div>
      
      <div className={`p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${isModalOpen ? "hidden" : ""}`}>
        {dietPlans.map((plan, index) => (
          <div
            key={index}
            onClick={() => setSelectedPlan(index)}
            className={`relative shadow-md rounded-lg p-5 border border-gray-200 transition-colors cursor-pointer ${
              selectedPlan === index ? "bg-blue-100" : "bg-white"
            }`}
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

            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {plan.dietName}
            </h3>
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

export default DietPreferences;
