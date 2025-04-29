import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ViewPlan = () => {
  const { id } = useParams(); // Get the plan ID from the URL
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    const fetchPlanDetails = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `https://ecg-wv62.onrender.com/api/plan/getById/${id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setPlan(res.data.data || res.data.plan || res.data); // Adjust based on API response
      } catch (error) {
        console.error("Error fetching plan details:", error);
      }
    };

    fetchPlanDetails();
  }, [id]);

  if (!plan) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen p-5">
      <h1 className="text-3xl font-bold mb-4">{plan.title}</h1>
      <img
        src={plan.photo}
        alt={plan.title}
        className="w-full h-60 object-cover rounded mb-4"
      />
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Description:</span> {plan.description}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Duration:</span> {plan.duration_in_day}{" "}
        day(s)
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Times/Week:</span> {plan.times_per_week}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Difficulty:</span> {plan.difficulty}
      </p>
      <p className="text-gray-700 mb-2">
        <span className="font-semibold">Category:</span> {plan.category}
      </p>
      <div className="text-gray-700">
        <h4 className="font-semibold mb-2">Schedule:</h4>
        {plan.schedule?.map((week) => (
          <div key={week._id} className="pl-2 border-l-2 border-blue-400 mb-2">
            <p>
              <span className="font-semibold">
                Week Number: {week.weekNumber}
              </span>{" "}
              <br />
              <span className="font-semibold">
                Week Description: {week.week_description}
              </span>{" "}
            </p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 mt-4 font-semibold">
        Created at: {new Date(plan.createdAt).toLocaleDateString("en-GB")}
      </p>
    </div>
  );
};

export default ViewPlan;
