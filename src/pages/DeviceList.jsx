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
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    },
    {
      id: "Seth",
      name: "Lucas",
      type: 26,
      status: "Active" ,
      view: "View",
    }
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(30);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <Header name="DeviceList" />
      <TableContainer
        className="shadow-lg rounded-lg ml-1 overflow-auto mt-14 "
        style={{ height: "795px" }}
        name="UserDetails"
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index} className="hover:bg-gray-100 ">
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell><Link to="/devicedetails">{row.view}</Link></TableCell>
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
    </>
  );
};

export default DeviceList;
