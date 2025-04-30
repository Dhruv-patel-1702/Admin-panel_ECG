import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Select,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";

const columns = [
  { id: "photo", label: "Image", minWidth: 100 },
  { id: "title", label: "Title", minWidth: 150 },
  {
    id: "duration_in_day",
    label: "Duration (Days)",
    minWidth: 100,
    align: "right",
  },
  { id: "times_per_week", label: "Times/Week", minWidth: 100, align: "right" },
  { id: "difficulty", label: "Difficulty", minWidth: 100, align: "right" },
  { id: "status", label: "Status", minWidth: 100, align: "right" },
  { id: "actions", label: "Actions", minWidth: 150, align: "center" },
];

const Addplan = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [page, setPage] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [newStatus, setNewStatus] = useState("");

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          "https://ecg-wv62.onrender.com/api/plan/getAllPlan",
          {
            headers: {
              Authorization: token,
            },
          }
        );

        if (Array.isArray(res.data)) {
          setPlans(res.data);
        } else if (Array.isArray(res.data.data)) {
          setPlans(res.data.data);
        } else if (Array.isArray(res.data.plans)) {
          setPlans(res.data.plans);
        } else {
          console.error("Unexpected response structure", res.data);
          setPlans([]);
        }
      } catch (error) {
        console.error("Error fetching plans:", error);
      }
    };

    fetchPlans();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleStatusChange = (plan, status) => {
    setSelectedPlan(plan);
    setNewStatus(status);
    setOpenDialog(true);
  };

  const handleConfirmStatusChange = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `https://ecg-wv62.onrender.com/api/plan/updateStatus/${selectedPlan._id}`,
        { status: newStatus },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setPlans(
        plans.map((plan) =>
          plan._id === selectedPlan._id ? { ...plan, status: newStatus } : plan
        )
      );
      setOpenDialog(false);
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div className="min-h-screen pb-10">
      <Header
        name="Add Plan"
        style={{ position: "fixed", top: 0, width: "100%", zIndex: 10 }}
      />

      <div className="pt-5 bg-white flex justify-between items-center mb-5 px-5">
        <h2 className="text-2xl font-bold">Add Plan</h2>
        <button
          className="bg-[#6178bc] text-white py-2 px-4 rounded-lg hover:bg-[#50639e] transition"
          onClick={() => navigate("/createplan")}
        >
          Create Plan
        </button>
      </div>

      <div className="px-5">
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {[...plans]
                  .reverse()
                  .slice(page * 10, (page + 1) * 10)
                  .map((plan) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        tabIndex={-1}
                        key={plan._id}
                        sx={{ height: 40 }} // Reduce row height
                      >
                        {columns.map((column) => {
                          let value;
                          if (column.id === "photo") {
                            value = (
                              <img
                                src={plan.photo}
                                alt={plan.title}
                                className="w-14 h-14 rounded-full object-cover "
                              />
                            );
                          } else if (column.id === "status") {
                            value = (
                              <select
                                value={plan.status} // default selected value
                                onChange={async (e) => {
                                  const newStatus = e.target.value;
                                  const confirmed = window.confirm(
                                    `Are you sure you want to change status to ${newStatus}?`
                                  );
                                  if (confirmed) {
                                    try {
                                      const token =
                                        localStorage.getItem("token");
                                      await axios.patch(
                                        `https://ecg-wv62.onrender.com/api/plan/statusUpdate/${plan._id}`,
                                        { status: newStatus },
                                        {
                                          headers: {
                                            Authorization: token,
                                          },
                                        }
                                      );
                                      // Update local state to reflect change
                                      setPlans((prev) =>
                                        prev.map((p) =>
                                          p._id === plan._id
                                            ? { ...p, status: newStatus }
                                            : p
                                        )
                                      );
                                    } catch (error) {
                                      console.error(
                                        "Failed to update status:",
                                        error
                                      );
                                    }
                                  }
                                }}
                                className="border px-2 py-1 rounded"
                              >
                                <option value="Basic">Basic</option>
                                <option value="Pro">Pro</option>
                                <option value="Premium">Premium</option>
                              </select>
                            );
                          } else if (column.id === "actions") {
                            value = (
                              <div className="space-x-2">
                                <button
                                  onClick={() =>
                                    navigate(`/EditPlan/${plan._id}`)
                                  }
                                  className="text-blue-500 hover:text-blue-700"
                                >
                                  <EditIcon />
                                </button>
                                <button
                                  onClick={() =>
                                    navigate(`/ViewPlan/${plan._id}`)
                                  }
                                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-xs"
                                >
                                  View
                                </button>
                              </div>
                            );
                          } else {
                            value = plan[column.id];
                          }
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              sx={{ padding: "4px 8px" }} // Reduce padding
                            >
                              {value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={plans.length}
            page={page}
            rowsPerPage={10}
            rowsPerPageOptions={[]}
            onPageChange={handleChangePage}
          />
        </Paper>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Status Change</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to change the status of this plan?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            No
          </Button>
          <Button onClick={handleConfirmStatusChange} color="secondary">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Addplan;
