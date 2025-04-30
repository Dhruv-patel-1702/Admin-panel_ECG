import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Components/Header";

const ViewPlan = () => {
  const { id } = useParams(); // Get the plan ID from the URL
  const [plan, setPlan] = useState(null);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [expandedWeeks, setExpandedWeeks] = useState({});

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
    return <div className="text-center">Loading...</div>;
  }

  const toggleDescription = () => {
    setIsDescriptionExpanded(!isDescriptionExpanded);
  };

  const toggleWeekDescription = (weekId) => {
    setExpandedWeeks((prev) => ({
      ...prev,
      [weekId]: !prev[weekId],
    }));
  };

  return (
    <div>
      <Header name="View Plan"></Header>
      <div className="min-h-screen flex justify-center items-center p-5 bg-gray-50">
        <div className="max-w-4xl w-full bg-white p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold text-center text-[#6178bc] mb-4">
            {plan.title}
          </h1>
          <img
            src={plan.photo}
            alt={plan.title}
            className="w-full h-80 object-cover rounded-lg shadow-md mb-6"
          />
          <div className="space-y-4">
            <p className="text-gray-700 break-words whitespace-pre-line">
              <span className="font-semibold">Description:</span>{" "}
              {plan.description.length > 250 ? (
                <>
                  {isDescriptionExpanded
                    ? plan.description
                    : plan.description.slice(0, 250) + "..."}
                  <button
                    className="text-blue-600 ml-2 font-medium"
                    onClick={toggleDescription}
                  >
                    {isDescriptionExpanded ? "Read Less" : "Read More"}
                  </button>
                </>
              ) : (
                plan.description
              )}
            </p>

            <p className="text-gray-700">
              <span className="font-semibold">Duration:</span>{" "}
              {plan.duration_in_day} Days
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Times/Week:</span>{" "}
              {plan.times_per_week}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Difficulty:</span>{" "}
              {plan.difficulty}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Category:</span> {plan.category}
            </p>
          </div>

          <div className="mt-6 text-gray-700">
            <h4 className="font-semibold text-lg mb-3">Schedule:</h4>
            {plan.schedule?.map((week) => (
              <div
                key={week._id}
                className="pl-4 mb-4 border-l-4 border-blue-400"
              >
                <p>
                  <span className="font-semibold">Week Number:</span>{" "}
                  {week.weekNumber}
                </p>
                <p className="break-words whitespace-pre-line">
                  <span className="font-semibold">Week Description:</span>{" "}
                  {week.week_description.length > 250 ? (
                    <>
                      {expandedWeeks[week._id]
                        ? week.week_description
                        : week.week_description.slice(0, 250) + "..."}
                      <button
                        className="text-blue-600 ml-2 font-medium"
                        onClick={() => toggleWeekDescription(week._id)}
                      >
                        {expandedWeeks[week._id] ? "Read Less" : "Read More"}
                      </button>
                    </>
                  ) : (
                    week.week_description
                  )}
                </p>
              </div>
            ))}
          </div>

          <p className="text-xs text-gray-400 mt-6 font-semibold text-right">
            Created at: {new Date(plan.createdAt).toLocaleDateString("en-GB")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewPlan;
