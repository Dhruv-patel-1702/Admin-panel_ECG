import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  CircularProgress,
} from "@mui/material";
import Header from "../Components/Header";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UserList = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://ecg-wv62.onrender.com/api/appAdmin/getAllUser",
          {
            headers: { Authorization: token },
          }
        );

        const users = Array.isArray(res.data.users) ? res.data.users : [];

        const filteredUsers = users.map((user) => ({
          id: user._id,
          name: user.full_name || "N/A",
          mobile: user.phoneNumber || "N/A",
          email: user.email || "N/A",
          registration_date: user.createdAt || "N/A",
          status: user.status || "active",
          view: "View",
        }));

        setRows(filteredUsers);
      } catch (error) {
        setError("Failed to fetch user data. Please try again later.");
        console.error("Error fetching user data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = rows.filter((row) => {
    const matchesName = row.name
      .toLowerCase()
      .includes(searchName.toLowerCase());
    const matchesMobile = row.mobile.includes(searchMobile);
    const matchesEmail = row.email
      .toLowerCase()
      .includes(searchEmail.toLowerCase());
    return matchesName && matchesMobile && matchesEmail;
  });

  // ✅ Corrected Block User Function
  const handleBlockUser = async (userId, currentStatus) => {
    try {
      const token = localStorage.getItem("token");
      const newStatus = currentStatus === "blocked" ? "active" : "blocked"; // lowercase ✅

      const res = await axios.patch(
        `https://ecg-wv62.onrender.com/api/appAdmin/userStatus/${userId}`,
        { status: newStatus }, // Correct body ✅
        {
          headers: { Authorization: token },
        }
      );

      if (res.status !== 200) {
        throw new Error("Failed to update user status");
      }

      toast.success(
        newStatus === "blocked"
          ? "User blocked successfully!"
          : "User activated successfully!",
        { position: "bottom-right" }
      );

      // Update UI
      setRows((prevRows) =>
        prevRows.map((row) =>
          row.id === userId ? { ...row, status: newStatus } : row
        )
      );
    } catch (error) {
      console.error("Error updating user status:", error);
      toast.error("Failed to update user status!", {
        position: "bottom-right",
      });
    }
  };

  return (
    <>
      <Header name="UserList" />

      <div className="flex space-x-4 mt-5 mb-4 w-[70%]">
        <input
          type="text"
          placeholder="Search by Name"
          className="flex-1 p-2 border border-gray-300 rounded"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Mobile"
          className="flex-1 p-2 border border-gray-300 rounded"
          value={searchMobile}
          onChange={(e) => setSearchMobile(e.target.value)}
        />
        <input
          type="text"
          placeholder="Search by Email"
          className="flex-1 p-2 border border-gray-300 rounded"
          value={searchEmail}
          onChange={(e) => setSearchEmail(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center mt-10">
          <CircularProgress />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mt-10">{error}</div>
      ) : (
        <>
          <TableContainer
            className="shadow-lg rounded-lg overflow-auto mt-4"
            style={{ maxHeight: "500px" }}
          >
            <Table stickyHeader>
              <TableHead className="bg-[#9fb1e7]">
                <TableRow>
                  <TableCell className="font-bold">Name</TableCell>
                  <TableCell className="font-bold">Phone Number</TableCell>
                  <TableCell className="font-bold">Email</TableCell>
                  <TableCell className="font-bold">Registration Date</TableCell>
                  <TableCell className="font-bold">Status</TableCell>
                  <TableCell className="font-bold">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredRows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row, index) => (
                    <TableRow key={index} className="hover:bg-gray-100">
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.mobile}</TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>
                        {new Date(row.registration_date).toLocaleDateString(
                          "en-GB"
                        )}
                      </TableCell>

                      <TableCell
                        sx={{
                          color: row.status === "active" ? "#32CD32" : "red",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                        onClick={() => handleBlockUser(row.id, row.status)}
                      >
                        {row.status}
                      </TableCell>

                      <TableCell>
                        <Link to={`/userdetails`}>{row.view}</Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
          <ToastContainer />
        </>
      )}
    </>
  );
};

export default UserList;
