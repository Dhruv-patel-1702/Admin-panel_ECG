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

const UserList = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchName, setSearchName] = useState("");
  const [searchMobile, setSearchMobile] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem("token"); // Retrieve token from localStorage
        const res = await axios.get(
          "https://ecg-s6x7.onrender.com/api/appAdmin/getAllUser",
          {
            headers: {
              Authorization: token, // Include token in headers
            },
          }
        );

        const users = res.data || [];
        // Only pick required fields
        const filteredUsers = users.map((user) => ({
          name: user.full_name || "N/A",
          mobile: user.phoneNumber || "N/A",
          email: user.email || "N/A",
          registration_date: user.createdAt || "N/A",
          view: "view",
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

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  // Handle rows per page change
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Filtering logic
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

  return (
    <>
      <Header name="UserList" />

      <div className="flex space-x-4 mt-5 mb-4 w-[70%]">
        {/* Search by Name */}
        <input
          type="text"
          placeholder="Search by Name"
          className="flex-1 p-2 border border-gray-300 rounded"
          value={searchName}
          onChange={(event) => setSearchName(event.target.value)}
        />

        {/* Search by Mobile */}
        <input
          type="text"
          placeholder="Search by Mobile"
          className="flex-1 p-2 border border-gray-300 rounded"
          value={searchMobile}
          onChange={(event) => setSearchMobile(event.target.value)}
        />

        {/* Search by Email */}
        <input
          type="text"
          placeholder="Search by Email"
          className="flex-1 p-2 border border-gray-300 rounded"
          value={searchEmail}
          onChange={(event) => setSearchEmail(event.target.value)}
        />
      </div>

      {/* Loading Spinner */}
      {isLoading ? (
        <div className="flex justify-center items-center mt-10">
          <CircularProgress />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center mt-10">{error}</div>
      ) : (
        <>
          {/* Table for displaying data */}
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
                  <TableCell className="font-bold">Block User</TableCell>
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

                        <TableCell sx={{color:"red" , cursor:"pointer"}}>Block</TableCell>
                      <TableCell>
                        <Link to={`/userdetails`}>{row.view}</Link>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Pagination */}
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </>
      )}
    </>
  );
};

export default UserList;
