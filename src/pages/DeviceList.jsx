import React, { useState, useEffect } from "react";
import axios from "axios";
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
  Button,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Header from "../Components/Header";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "white",
  borderRadius: "8px",
  boxShadow: 24,
  p: 4,
};

const DeviceList = () => {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [deviceNameQuery, setDeviceNameQuery] = useState("");
  const [typeQuery, setTypeQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [newDevice, setNewDevice] = useState({ name: "", type: "" });
  const [editMode, setEditMode] = useState(false);
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deviceToDelete, setDeviceToDelete] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get("https://ecg-wv62.onrender.com/api/device/getall");
      const data = response.data.devices || response.data.data || response.data;
      setRows(data);
    } catch (error) {
      console.error("Error fetching device data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRows = Array.isArray(rows)
    ? rows.filter(
        (row) =>
          row.name?.toLowerCase().includes(deviceNameQuery.toLowerCase()) &&
          row.type?.toLowerCase().includes(typeQuery.toLowerCase())
      )
    : [];

  const handleOpenAdd = () => {
    setEditMode(false);
    setSelectedDevice(null);
    setNewDevice({ name: "", type: "" });
    setOpen(true);
  };

  const handleEdit = (device) => {
    setEditMode(true);
    setSelectedDevice(device);
    setNewDevice({ name: device.name, type: device.type });
    setOpen(true);
  };

  const handleDelete = (id) => {
    setDeviceToDelete(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`https://ecg-wv62.onrender.com/api/device/delete/${deviceToDelete}`);
      setConfirmOpen(false);
      fetchData();
    } catch (error) {
      console.error("Error deleting device:", error);
    }
  };

  const handleModalSubmit = async () => {
    try {
      if (editMode && selectedDevice) {
        await axios.put(
          `https://ecg-wv62.onrender.com/api/device/update/${selectedDevice._id}`,
          newDevice
        );
      } else {
        await axios.post("https://ecg-wv62.onrender.com/api/device/add", newDevice);
      }
      setOpen(false);
      setNewDevice({ name: "", type: "" });
      setEditMode(false);
      setSelectedDevice(null);
      fetchData();
    } catch (error) {
      console.error("Error saving device:", error);
    }
  };

  return (
    <>
      <Header name="DeviceList" />
      <div className="flex justify-between mt-5 mb-4 w-full pr-4">
        <div className="flex space-x-4 w-[50%]">
          <input
            type="text"
            placeholder="Search by Device Name"
            className="flex-1 p-2 border border-gray-300 rounded"
            onChange={(event) => setDeviceNameQuery(event.target.value)}
          />
          <input
            type="text"
            placeholder="Search by Type"
            className="flex-1 p-2 border border-gray-300 rounded"
            onChange={(event) => setTypeQuery(event.target.value)}
          />
        </div>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenAdd}
          sx={{ height: "42px" }}
        >
          Add Device
        </Button>
      </div>

      <TableContainer
        component={Paper}
        className="shadow-lg rounded-lg ml-1 overflow-auto mt-4"
        style={{ maxHeight: "500px" }}
      >
        <Table stickyHeader>
          <TableHead className="bg-[#9fb1e7]">
            <TableRow>
              <TableCell className="font-bold">Device ID</TableCell>
              <TableCell className="font-bold">Name</TableCell>
              <TableCell className="font-bold">Type</TableCell>
              <TableCell className="font-bold">Status</TableCell>
              <TableCell className="font-bold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredRows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => (
                <TableRow key={index} className="hover:bg-gray-100">
                  <TableCell>{row.unique_id || row.deviceId}</TableCell>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.status}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2 items-center">
                      <EditIcon
                        className="text-blue-500 cursor-pointer"
                        onClick={() => handleEdit(row)}
                      />
                      <DeleteIcon
                        className="text-red-500 cursor-pointer"
                        onClick={() => handleDelete(row._id)}
                      />
                    </div>
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

      {/* Add/Edit Device Modal */}
      <Modal open={open} onClose={() => setOpen(false)}>
        <Box sx={style}>
          <h2>{editMode ? "Edit Device" : "Add New Device"}</h2>
          <TextField
            fullWidth
            label="Device Name"
            value={newDevice.name}
            onChange={(e) => setNewDevice({ ...newDevice, name: e.target.value })}
            sx={{ mt: 2 }}
          />
          <TextField
            fullWidth
            label="Device Type"
            value={newDevice.type}
            onChange={(e) => setNewDevice({ ...newDevice, type: e.target.value })}
            sx={{ mt: 2 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleModalSubmit}
            sx={{ mt: 2 }}
          >
            {editMode ? "Update" : "Submit"}
          </Button>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <Box sx={style}>
          <h3>Are you sure you want to delete this device?</h3>
          <div className="flex justify-end space-x-4 mt-4">
            <Button
              variant="outlined"
              onClick={() => setConfirmOpen(false)}
              color="primary"
            >
              No
            </Button>
            <Button
              variant="contained"
              onClick={confirmDelete}
              color="error"
            >
              Yes, Delete
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default DeviceList;
