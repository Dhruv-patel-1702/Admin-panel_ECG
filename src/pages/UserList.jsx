import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination
} from "@mui/material";
import Header from "../Components/Header";
import { Link } from "react-router-dom";

const UserList = (props) => {
  const rows = [
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "smit",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "smit",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "smit",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "smit",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "smit",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "smit",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "smit",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 1234512345",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 0987667890",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
    {
      name: "dhruv",
      mobile: "(+91) 2342342342",
      email: "abc@gmail.com",
      view: "view",
    },
  ];

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredRows = rows.filter(
    (row) =>
      row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      row.mobile.includes(searchQuery) ||
      row.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Header name="UserList" />
     
      <div className="flex space-x-4 mt-20 mb-4 w-[70%]">
        <input
          type="text"
          placeholder="Search by Name"
          className="flex-1 p-2 border border-gray-300 rounded"
          onChange={(event) => {
            const value = event.target.value;

            if (/^[a-zA-Z\s]*$/.test(value)) {
              setSearchQuery(value);

              const nameFilteredRows = rows.filter((row) =>
                row.name.toLowerCase().includes(value.toLowerCase())
              );
            } else {
              setSearchQuery("");
            }
          }}
          onInput={(event) => {
            event.target.value = event.target.value.replace(/[^a-zA-Z\s]/g, "");
          }}
        />

        <input
          type="text"
          placeholder="Search by Mobile"
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          onChange={(event) => {
            const value = event.target.value;

            if (/^\d*$/.test(value)) {
              setSearchQuery(value);

              const mobileFilteredRows = rows.filter((row) =>
                row.mobile.includes(value)
              );
            } else {
              setSearchQuery("");
            }
          }}
          onInput={(event) => {
            event.target.value = event.target.value.replace(/\D/g, "");
          }}
        />

        <input
          type="text"
          placeholder="Search by Email"
          style={{
            flex: 1,
            padding: "8px",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            // Filter by mobile number
            const mobileFilteredRows = rows.filter((row) =>
              row.mobile.includes(event.target.value)
            );
            // Update the filtered rows state if needed
          }}
        />
      </div>
      <TableContainer
        className="shadow-lg rounded-lg overflow-auto mt-4"
        style={{ maxHeight: "700px" }}
      >
        <Table stickyHeader>
          <TableHead className="bg-[#9fb1e7]">
            <TableRow>
              <TableCell className="font-bold">Name</TableCell>
              <TableCell className="font-bold">Mobile</TableCell>
              <TableCell className="font-bold">Email</TableCell>
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
    </>
  );
};

export default UserList;
