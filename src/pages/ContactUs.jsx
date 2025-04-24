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

const ContactUs = () => {
  const rows = [
    {
      name: "Seth",
      email: 26,
      description: "Hello How are you  my name is dhruv patel",
    },
    {
      name: "Seth",
      email: 26,
      description: "Hello How are you  my name is dhruv patel",
    },
    {
      name: "Seth",
      email: 26,
      description: "Hello How are you  my name is dhruv patel",
    },
    {
      name: "Seth",
      email: 26,
      description: "Hello How are you  my name is dhruv patel",
    },
    {
      name: "Seth",
      email: 26,
      description: "Hello How are you  my name is dhruv patel",
    },
    {
      name: "Seth",
      email: 26,
      description: "Hello How are you  my name is dhruv patel",
    },
    {
      name: "Seth",
      email: 26,
      description: "Hello How are you  my name is dhruv patel",
    },
    {
      name: "Seth",
      email: 26,
      description: "Hello How are you  my name is dhruv patel",
    },
    {
      name: "Seth",
      email: 26,
      description: "Hello How are you  my name is dhruv patel",
    },
    {
      name: "Seth",
      email: 26,
      description: "Hello How are you  my name is dhruv patel",
    },
    {
      name: "Seth",
      email: 26,
      description: "Hello How are you  my name is dhruv patel",
    },
    {
      name: "Seth",
      email: 26,
      description: "Hello How are you  my name is dhruv patel",
    },
    {
      name: "Seth",
      email: 26,
      description: "Hello How are you  my name is dhruv patel",
    },
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
      <Header name="Contact Us" />
      <TableContainer
        className="shadow-lg rounded-lg ml-1 overflow-auto mt-5 "
        style={{ height: "550px" }}
        name="UserDetails"
      >
        <Table stickyHeader className="px-2">
          <TableHead className="bg-[#9fb1e7] ">
            <TableRow sx={{ backgroundColor: "blue" }}>
              <TableCell className="font-bold ">Name</TableCell>
              <TableCell className="font-bold ">Email</TableCell>
              <TableCell className="font-bold ">Description</TableCell>
              <TableCell className="font-bold "></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index} className="hover:bg-gray-100 ">
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>
                    <button className="bg-red-500 px-4 py-1 text-white rounded-lg relative left-28">Delete</button>
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
    </>
  );
};

export default ContactUs;
