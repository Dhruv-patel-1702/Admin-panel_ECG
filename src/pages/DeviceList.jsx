import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import Header from "../Components/Header";

const DeviceList = () => {
  const rows = [
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "DDDD",
      name: "Lucas",
      type: 26,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "ppppp",
      type: 30,
      status: "Active",
      view: "View",
    },
    {
      id: "Seth",
      name: "pppp",
      type: 30,
      status: "Active",
      view: "View",
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deviceNameQuery, setDeviceNameQuery] = useState("");
  const [typeQuery, setTypeQuery] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(deviceNameQuery.toLowerCase()) &&
      row.type.toString().includes(typeQuery)
  );

  return (
    <>
      <Header name="DeviceList" />
      <div className="flex space-x-4 mt-5 mb-4 w-[50%]">
        <input
          type="text"
          placeholder="Search by DeviceName"
          className="flex-1 p-2 border border-gray-300 rounded"
          onChange={(event) => {
            setDeviceNameQuery(event.target.value);
          }}
        />    
        <input
          type="text"
          placeholder="Search by Type"
          className="flex-1 p-2 border border-gray-300 rounded"
          onChange={(event) => {
            setTypeQuery(event.target.value);
          }}
        />
      </div>
      <TableContainer
        className="shadow-lg rounded-lg ml-1 overflow-auto mt-4"
        style={{ maxHeight: "500px" }}
      >
        <Table stickyHeader className="px-2">
          <TableHead className="bg-[#9fb1e7] ">
            <TableRow sx={{ backgroundColor: "blue" }}>
              <TableCell className="font-bold ">ID</TableCell>
              <TableCell className="font-bold ">Device Name</TableCell>
              <TableCell className="font-bold ">Type</TableCell>
              <TableCell className="font-bold ">Status</TableCell>
              <TableCell className="font-bold ">View</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index} className="hover:bg-gray-100 ">
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <Link to="/devicedetails">{row.view}</Link>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={filteredRows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default DeviceList;
