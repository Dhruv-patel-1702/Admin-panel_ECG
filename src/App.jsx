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
import ContactUs from "./pages/ContactUs";
import ChangePassword from './pages/Change_Password/change_password';
import Createplan from "./Components/Createplan";
import Addplan from "./pages/Addplan";
import ViewPlan from "./pages/ViewPlan";
import EditPlan from "./pages/editplan";
import Coupon from "./pages/coupon";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/" element={<Dashboard />}>
          <Route path="/userlist" element={<UserList />} />
          <Route path="/devicelist" element={<DeviceList />} />
          <Route path="/ecg_dashboard" element={<ECG_dashboard />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/devicedetails" element={<DeviceDetails />} />
          <Route path="/foodpreferences" element={<FoodPreferences />} />
          <Route path="/addplan" element={<Addplan />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/createplan" element={<Createplan />} />
          <Route path="/ChangePassword" element={<ChangePassword />} />
          <Route path="/ViewPlan/:id" element={<ViewPlan />} />
          <Route path="/EditPlan/:id" element={<EditPlan />} />
          <Route path="/coupon" element={<Coupon />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
