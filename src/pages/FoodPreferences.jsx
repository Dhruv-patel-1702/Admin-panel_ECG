import React, { useState } from "react";
import Header from "../Components/Header";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const FoodPreferences = () => {
  const [selectedFoodIndex, setSelectedFoodIndex] = useState(null);
  
  // New state for input fields
  const [newFood, setNewFood] = useState({
    name: "",
    cuisine: "",
    dietaryPreference: "",
    category: ""
  });

  const foodPreferences = [
    {
      name: "Brown Rice & Steamed Vegetables",
      cuisine: "Asian",
      dietaryPreference: "Diabetic-Friendly",
      description: "A balanced meal with low glycemic index carbs and fiber-rich vegetables to regulate blood sugar levels.",
    },
    {
      name: "Grilled Chicken with Quinoa",
      cuisine: "Mediterranean",
      dietaryPreference: "High-Protein",
      description: "A protein-packed dish ideal for muscle recovery and overall strength.",
    },
    {
      name: "Oats with Chia Seeds & Berries",
      cuisine: "American",
      dietaryPreference: "Heart-Healthy",
      description: "A fiber-rich breakfast that helps lower cholesterol and supports heart health.",
    },
    {
      name: "Lentil Soup",
      cuisine: "Middle Eastern",
      dietaryPreference: "Iron-Rich",
      description: "A nutritious soup high in iron and protein, ideal for anemia prevention.",
    },
    {
      name: "Steamed Salmon with Spinach",
      cuisine: "American",
      dietaryPreference: "Omega-3 Rich",
      description: "A meal rich in omega-3 fatty acids to support brain and heart health.",
    },
    {
      name: "Greek Yogurt with Flaxseeds",
      cuisine: "Greek",
      dietaryPreference: "Gut-Healthy",
      description: "A probiotic-rich dish that improves digestion and promotes gut health.",
    },
    {
      name: "Steamed Salmon with Spinach",
      cuisine: "American",
      dietaryPreference: "Omega-3 Rich",
      description: "A meal rich in omega-3 fatty acids to support brain and heart health.",
    },
    {
      name: "Greek Yogurt with Flaxseeds",
      cuisine: "Greek",
      dietaryPreference: "Gut-Healthy",
      description: "A probiotic-rich dish that improves digestion and promotes gut health.",
    },
    {
      name: "Steamed Salmon with Spinach",
      cuisine: "American",
      dietaryPreference: "Omega-3 Rich",
      description: "A meal rich in omega-3 fatty acids to support brain and heart health.",
    },
    {
      name: "Greek Yogurt with Flaxseeds",
      cuisine: "Greek",
      dietaryPreference: "Gut-Healthy",
      description: "A probiotic-rich dish that improves digestion and promotes gut health.",
    },
    {
      name: "Steamed Salmon with Spinach",
      cuisine: "American",
      dietaryPreference: "Omega-3 Rich",
      description: "A meal rich in omega-3 fatty acids to support brain and heart health.",
    },
    {
      name: "Greek Yogurt with Flaxseeds",
      cuisine: "Greek",
      dietaryPreference: "Gut-Healthy",
      description: "A probiotic-rich dish that improves digestion and promotes gut health.",
    },
    
  ];
  
  const handleFoodSelect = (index) => {
    setSelectedFoodIndex(index);
  };

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewFood((prev) => ({ ...prev, [name]: value }));
  };

  // Handle adding or updating food
  const handleAddOrUpdateFood = () => {
    if (selectedFoodIndex !== null) {
      // Update existing food item
      setFoodPreferences((prev) => {
        const updatedFood = [...prev];
        updatedFood[selectedFoodIndex] = newFood;
        return updatedFood;
      });
    } else {
      // Add new food item
      setFoodPreferences((prev) => [...prev, newFood]);
    }
    setNewFood({ name: "", cuisine: "", dietaryPreference: "", category: "" }); // Reset input fields
    setSelectedFoodIndex(null); // Reset selected index
  };

  // Handle edit click
  const handleEditClick = (index) => {
    setSelectedFoodIndex(index);
    setNewFood(foodPreferences[index]); // Populate input fields with selected food item
  };

  // Handle delete click
  const handleDeleteClick = (index) => {
    setFoodPreferences((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen w-full">
      <div className="w-full">
        <Header name="Food Preferences" />
        <div className="p-4 bg-white w-full ">
          <div className=" mb-4 flex flex-col items-center md:flex-row md:space-x-4 fixed top-20 z-10 bg-white ">
            <input
              type="text"
              name="name"
              value={newFood.name}
              onChange={handleInputChange}
              placeholder="Food Name"
              className="border rounded p-2 w-full h-10 "
            />
            <input
              type="text"
              name="cuisine"
              value={newFood.cuisine}
              onChange={handleInputChange}
              placeholder="Cuisine"
              className="border rounded p-2 w-full h-10"
            />
            <input
              type="text"
              name="dietaryPreference"
              value={newFood.dietaryPreference}
              onChange={handleInputChange}
              placeholder="Dietary Preference"
              className="border rounded p-2 w-full h-10"
            />
            <select
              name="category"
              value={newFood.category}
              onChange={handleInputChange}
              className="border rounded p-2 w-full h-10 "
            >
              <option>Select Food Category</option>
              <option>Low Sodium</option>
              <option>Heart Healthy</option>
              <option>Diabetic Friendly</option>
              <option>High Protein</option>
              <option>Gluten-Free</option>
              <option>Vegetarian</option>
              <option>Vegan</option>
            </select>
            <button
              onClick={handleAddOrUpdateFood}
              className="flex justify-center items-center text-base bg-blue-600 text-white rounded p-2 hover:bg-blue-700 transition h-10 w-full"
            >
              <span className="text-xl mr-1">+</span>{selectedFoodIndex !== null ? "UPDATE FOOD" : "ADD NEW FOOD"}
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 mt-20 overflow-y-auto h-[calc(100vh-200px)] bg-white">
          {foodPreferences.map((food, index) => (
            <div
              key={index}
              className={`border rounded p-4 shadow-md relative h-48 ${
                selectedFoodIndex === index ? "bg-blue-100" : "bg-white"
              }`}
              onClick={() => handleFoodSelect(index)}
            >
              <button className="absolute top-2 right-10 text-blue-500 hover:text-blue-700 transition" onClick={() => handleEditClick(index)}>
                <EditIcon />
              </button>
              <button className="absolute top-2 right-2 text-red-500 hover:text-red-700 transition" onClick={() => handleDeleteClick(index)}>
                <DeleteIcon />
              </button>
              <h3 className="font-bold text-lg">{food.name}</h3>
              <p className="text-gray-700"><span className="font-medium">Cuisine:</span>  {food.cuisine}</p>
              <p className="text-gray-700">
              <span className="font-medium">Dietary Preference:</span>{food.dietaryPreference}
              </p>
              <p className="text-gray-700"><span className="font-medium">Description:</span> {food.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FoodPreferences;
