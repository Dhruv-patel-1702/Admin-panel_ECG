import React, { useEffect, useState } from "react";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import Header from '../Components/Header'

import DeleteIcon from "@mui/icons-material/Delete";
const Coupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discount: "",
    startDate: "",
    endDate: "",
  });
  const [deleteId, setDeleteId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editId, setEditId] = useState(null); // to track which coupon is being edited
  const [isEditMode, setIsEditMode] = useState(false); // toggle edit/add

  useEffect(() => {
    fetchCoupons();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-based
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchCoupons = async () => {
    try {
      const res = await axios.get(
        "https://ecg-wv62.onrender.com/api/coupon/get"
      );
      setCoupons(res.data.coupons || []);
    } catch (err) {
      console.error("Failed to fetch coupons:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setNewCoupon({ ...newCoupon, [e.target.name]: e.target.value });
  };

  const handleAddCoupon = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      if (isEditMode) {
        // Update coupon
        await axios.patch(
          `https://ecg-wv62.onrender.com/api/coupon/updatecoupons/${editId}`,
          newCoupon,
          {
            headers: {
              Authorization: token,
            },
          }
        );
      } else {
        // Create coupon
        await axios.post(
          "https://ecg-wv62.onrender.com/api/coupon/create",
          newCoupon,
          {
            headers: {
              Authorization: token,
            },
          }
        );
      }

      setShowForm(false);
      setNewCoupon({ code: "", discount: "", startDate: "", endDate: "" });
      setIsEditMode(false);
      setEditId(null);
      fetchCoupons();
    } catch (error) {
      console.error("Failed to save coupon:", error);
    }
  };

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `https://ecg-wv62.onrender.com/api/coupon/deletecoupons/${deleteId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setShowDeleteModal(false);
      setDeleteId(null);
      fetchCoupons();
    } catch (error) {
      console.error("Failed to delete coupon:", error);
    }
  };

  const handleEditClick = (coupon) => {
    setIsEditMode(true);
    setEditId(coupon._id);
    setNewCoupon({
      code: coupon.code,
      discount: coupon.discount,
      startDate: coupon.startDate.split("T")[0],
      endDate: coupon.endDate.split("T")[0],
    });
    setShowForm(true);
  };

  return (
   <div>
    <Header name="Coupon"></Header>
     <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-left">Coupon List</h2>
        <button
          className="bg-[#6178bc] text-white px-4 py-2 rounded"
          onClick={() => {
            setIsEditMode(false);
            setShowForm(!showForm);
            setNewCoupon({
              code: "",
              discount: "",
              startDate: "",
              endDate: "",
            });
          }}
        >
          {showForm ? "Close" : "Add Coupon"}
        </button>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">
              {isEditMode ? "Edit Coupon" : "Add Coupon"}
            </h3>
            <form onSubmit={handleAddCoupon} className="grid gap-4">
              <input
                type="text"
                name="code"
                placeholder="Code"
                value={newCoupon.code}
                onChange={handleInputChange}
                required
                className="p-2 border rounded"
              />
              <input
                name="discount"
                placeholder="Discount %"
                value={newCoupon.discount}
                onChange={(e) => {
                  const value = e.target.value;
                  // Prevent the discount value from being 0 or less
                  if (value > 0 || value === "") {
                    handleInputChange(e);
                  }
                }}
                required
                className="p-2 border rounded"
              />

              <input
                type="date"
                name="startDate"
                value={newCoupon.startDate}
                onChange={handleInputChange}
                required
                className="p-2 border rounded"
                min={new Date().toISOString().split("T")[0]}
              />
              <input
                type="date"
                name="endDate"
                value={newCoupon.endDate}
                onChange={handleInputChange}
                required
                className="p-2 border rounded"
                min={
                  newCoupon.startDate
                    ? new Date(
                        new Date(newCoupon.startDate).getTime() +
                          24 * 60 * 60 * 1000
                      )
                        .toISOString()
                        .split("T")[0]
                    : new Date().toISOString().split("T")[0]
                }
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  className="bg-gray-500 text-white px-4 py-2 rounded"
                  onClick={() => {
                    setShowForm(false);
                    setIsEditMode(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  {isEditMode ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4 text-center">
              Are you sure you want to delete this coupon?
            </h3>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                No
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : coupons.length === 0 ? (
        <p>No coupons available.</p>
      ) : (
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Code</th>
              <th className="px-4 py-2 border">Discount (%)</th>
              <th className="px-4 py-2 border">Start Date</th>
              <th className="px-4 py-2 border">End Date</th>
              <th className="px-4 py-2 border">Created At</th>
              <th className="px-4 py-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <tr key={coupon._id} className="text-center">
                <td className="px-4 py-2 border">{coupon.code}</td>
                <td className="px-4 py-2 border">{coupon.discount}%</td>
                <td className="px-4 py-2 border">
                  {new Date(coupon.startDate)
                    .getDate()
                    .toString()
                    .padStart(2, "0")}
                  /
                  {(new Date(coupon.startDate).getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}
                  /{new Date(coupon.startDate).getFullYear()}
                </td>

                <td className="px-4 py-2 border">
                  {new Date(coupon.endDate)
                    .getDate()
                    .toString()
                    .padStart(2, "0")}
                  /
                  {(new Date(coupon.endDate).getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}
                  /{new Date(coupon.endDate).getFullYear()}
                </td>

                <td className="px-4 py-2 border">
                  {new Date(coupon.createdAt)
                    .getDate()
                    .toString()
                    .padStart(2, "0")}
                  /
                  {(new Date(coupon.createdAt).getMonth() + 1)
                    .toString()
                    .padStart(2, "0")}
                  /{new Date(coupon.createdAt).getFullYear()}
                </td>

                <td className=" py-2 border flex justify-center ">
                  <button
                    onClick={() => handleEditClick(coupon)}
                    className=" text-gray-500 p-2 rounded"
                  >
                    <EditIcon fontSize="small" />
                  </button>

                  <button
                    onClick={() => handleDeleteClick(coupon._id)}
                    className=" text-red-500 p-2 rounded"
                  >
                    <DeleteIcon fontSize="small" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
   </div>
  );
};

export default Coupon;
