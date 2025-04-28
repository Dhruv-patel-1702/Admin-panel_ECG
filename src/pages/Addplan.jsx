import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";

const Addplan = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://ecg-wv62.onrender.com/api/plan/getAllPlan",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (Array.isArray(res.data)) {
          setPlans(res.data); // ✅ Directly array
        } else if (Array.isArray(res.data.data)) {
          setPlans(res.data.data); // ✅ Inside `data` key
        } else if (Array.isArray(res.data.plans)) {
          setPlans(res.data.plans); // ✅ Inside `plans` key
        } else {
          console.error("Unexpected response structure", res.data);
          setPlans([]); // fallback to empty
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  return (
    <div className="min-h-screen pb-10">
      <Header
        name="Add Plan"
        style={{ position: "fixed", top: 0, width: "100%", zIndex: 10 }}
      />

      <div className=" pt-5 bg-white flex justify-between items-center mb-5 px-5">
        <h2 className="text-2xl font-bold">Add Plan</h2>
        <button
          className="bg-[#6178bc] text-white py-2 px-4 rounded-lg hover:bg-[#50639e] transition"
          onClick={() => navigate("/createplan")}
        >
          Create Plan
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-5">
        {plans.map((plan) => (
          <div
            key={plan._id}
            className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition duration-300 relative"
            style={{ zIndex: 1 }} // Decreased z-index for cards
          >
            {/* Image container with EditIcon */}
            <div className="relative">
              <img
                src={plan.photo} // Corrected to directly use plan.photo
                alt={plan.title}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2">
                <EditIcon
                  className="cursor-pointer text-gray-500 hover:text-gray-700 bg-white rounded-full p-2"
                  style={{ fontSize: "2rem" }} // Increased icon size
                  onClick={() => navigate(`/editplan/${plan._id}`)} // Navigate to edit page
                />
              </div>
            </div>

            <div className="p-4">
              <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
              <p className="text-gray-600 mb-2">{plan.description}</p>

              <div className="text-sm text-gray-700 mb-2">
                <p>
                  <span className="font-semibold">Duration:</span>{" "}
                  {plan.duration_in_day} day(s)
                </p>
                <p>
                  <span className="font-semibold">Times/Week:</span>{" "}
                  {plan.times_per_week}
                </p>
                <p>
                  <span className="font-semibold">Difficulty:</span>{" "}
                  {plan.difficulty}
                </p>
              </div>

              <h4 className="text-md font-semibold mt-4 mb-2">{plan.title2}</h4>
              <p className="text-gray-600 mb-4">{plan.description2}</p>

              <div className="text-sm text-gray-700">
                <h5 className="font-semibold mb-1">Schedule:</h5>
                {plan.schedule?.map((week) => (
                  <div
                    key={week._id}
                    className="pl-2 border-l-2 border-blue-400 mb-2"
                  >
                    <p>
                      <span className="font-semibold">Week {week.weekNumber}:</span>{" "}
                      {week.week_description}
                    </p>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-400 mt-4">
                Created at: {new Date(plan.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addplan;
