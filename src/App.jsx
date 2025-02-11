import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Dashboard";
import Login from "./Components/Login";
import UserList from "./pages/UserList";
import DeviceList from "./pages/DeviceList";
import ECG_dashboard from "./pages/ECG_dashboard";
import UserDetails from "./pages/UserDetails";
import DeviceDetails from './pages/DeviceDetails';
import FoodPreferences from "./pages/FoodPreferences";
import DietPreferences from "./pages/DietPreferences";
import ContactUs from "./pages/ContactUs";
import Adddiet from './Components/AddDiet'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Dashboard />}>
          <Route path="/userlist" element={<UserList />} />
          <Route path="/devicelist" element={<DeviceList />} />
          <Route path="/ecg_dashboard" element={<ECG_dashboard />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/devicedetails" element={<DeviceDetails />} />
          <Route path="/foodpreferences" element={<FoodPreferences />} />
          <Route path="/dietpreferences" element={<DietPreferences />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/adddiet" element={<Adddiet />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
