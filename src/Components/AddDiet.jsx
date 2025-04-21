import React, { useState } from "react";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";

const AddDiet = (props) => {
  const navigate = useNavigate();

  // State to hold diet preferences
  const [dietName, setDietName] = useState("");
  const [dietDescription, setDietDescription] = useState("");
  const [restrictions, setRestrictions] = useState("");
  const [recommendedFoods, setRecommendedFoods] = useState("");
  const [healthConditions, setHealthConditions] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("Inactive");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPlan = {
      dietName,
      dietDescription,
      restrictions,
      recommendedFoods,
      healthConditions,
      startDate,
      endDate,
      status: "Active",
    };
    props.onAddDietPlan(newPlan);
    navigate("/diet-preferences"); // Navigate to DietPreferences
  };

  return (
    <div>
      {" "}
      <Header
        name="Diet Preferences"
        style={{ position: "fixed", top: 0, width: "100%", zIndex: 10 }}
      />
      <div className="flex justify-center items-center h-screen  rounded-lg m-2">
        <div className="w-[50%] bg-white shadow-lg p-5 rounded-xl">
          <form onSubmit={handleSubmit} className="p-6 ">
            <input
              className="input-box border rounded-lg p-2 mb-4 w-full"
              type="text"
              placeholder="Diet Name"
              value={dietName}
              onChange={(e) => setDietName(e.target.value)}
            />
            <input
              className="input-box border rounded-lg p-2 mb-4 w-full"
              type="text"
              placeholder="Diet Description"
              value={dietDescription}
              onChange={(e) => setDietDescription(e.target.value)}
            />
            <input
              className="input-box border rounded-lg p-2 mb-4 w-full"
              type="text"
              placeholder="Restrictions"
              value={restrictions}
              onChange={(e) => setRestrictions(e.target.value)}
            />
            <input
              className="input-box border rounded-lg p-2 mb-4 w-full"
              type="text"
              placeholder="Recommended Foods"
              value={recommendedFoods}
              onChange={(e) => setRecommendedFoods(e.target.value)}
            />
            <input
              className="input-box border rounded-lg p-2 mb-4 w-full"
              type="text"
              placeholder="Applicable Health Conditions"
              value={healthConditions}
              onChange={(e) => setHealthConditions(e.target.value)}
            />
            <input
              className="input-box border rounded-lg p-2 mb-4 w-full"
              type="date"
              placeholder="Start Date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
            <input
              className="input-box border rounded-lg p-2 mb-4 w-full"
              type="date"
              placeholder="End Date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
            <select
              className="input-box border rounded-lg p-2 mb-4 w-full bg-white"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
            <button
              type="submit"
              className="submit-button bg-[#6178bc] text-white py-2 px-6 rounded-lg hover:bg-[#50639e]"
              onClick={() => navigate("/dietpreferences")}
            >
              Add Diet
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddDiet;
