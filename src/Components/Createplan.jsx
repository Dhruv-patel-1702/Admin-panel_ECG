import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  MenuItem,
  Box,
  Container,
  Typography,
  Paper,
  Select,
  InputLabel,
  FormControl,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import Header from "./Header";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Createplan = (props) => {
  const navigate = useNavigate();
  const [title, settitle] = useState("");
  const [title2, settitle2] = useState("");
  const [photo, setphoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [category, setcategory] = useState(""); // Corrected typo here
  const [description, setdescription] = useState("");
  const [description2, setdescription2] = useState("");
  const [duration_in_day, setduration_in_day] = useState("");
  const [times_per_week, settimes_per_week] = useState("");
  const [difficulty, setdifficulty] = useState("");
  const [schedule, setSchedule] = useState([]);

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setphoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    } else {
      alert("Please upload a valid JPEG or PNG image.");
    }
  };

  const handleAddSchedule = () => {
    setSchedule([...schedule, { weekNumber: "", week_description: "" }]);
  };

  const handleRemoveSchedule = (index) => {
    const updatedSchedule = schedule.filter((_, i) => i !== index);
    setSchedule(updatedSchedule);
  };

  const handleScheduleChange = (index, field, value) => {
    const updatedSchedule = [...schedule];
    updatedSchedule[index][field] = value;
    setSchedule(updatedSchedule);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validation
    if (title.length > 120) {
      alert("Title must be less than or equal to 120 characters.");
      return;
    }
    if (!/^\d+$/.test(duration_in_day)) {
      alert("Duration (in days) must be a valid number.");
      return;
    }

    if (!photo) {
      alert("Please upload a photo.");
      return;
    }

    if (schedule.length === 0) {
      alert("Please add at least one week to the schedule.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("title2", title2);
    formData.append("photo", photo);
    formData.append("category", category);
    formData.append("description", description);
    formData.append("description2", description2);
    formData.append("duration_in_day", duration_in_day);
    formData.append("times_per_week", times_per_week);
    formData.append("difficulty", difficulty);

    // Dynamically append weekNumber and week_description as indexed keys
    schedule.forEach((item, index) => {
      formData.append(`weekNumber[${index}]`, item.weekNumber);
      formData.append(`week_description[${index}]`, item.week_description);
    });

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://ecg-wv62.onrender.com/api/plan/add",
        formData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      if (response.status === 201) {
        toast.success("Plan successfully created!", {
          position: "bottom-right",
        });
        navigate("/addplan");
      } else {
        throw new Error("Failed to create plan.");
      }
    } catch (error) {
      toast.error("Error creating plan. Please try again.", {
        position: "bottom-right",
      });
      console.error("API Error:", error);
    }
  };

  const handleTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 120) {
      settitle(value);
    }
  };

  const handleDurationChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setduration_in_day(value);
    }
  };

  const handleTimesPerWeekChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      settimes_per_week(value);
    }
  };

  const handleOverviewTitleChange = (e) => {
    const value = e.target.value;
    if (value.length <= 120) {
      settitle2(value);
    }
  };

  return (
    <div>
      <Header
        name="Add Plan"
        style={{ position: "fixed", top: 0, width: "100%", zIndex: 10 }}
      />
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          pt: 0,
        }}
      >
        <Container maxWidth="md">
          <Paper sx={{ padding: 4, borderRadius: 3, boxShadow: "none" }}>
            <form onSubmit={handleSubmit}>
              <Typography variant="h5" mb={2} fontWeight="bold">
                Add Plan
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={title}
                  onChange={handleTitleChange}
                  helperText={`${title.length}/120 characters`}
                />
                <TextField
                  fullWidth
                  label="Overview Title"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={title2}
                  onChange={handleOverviewTitleChange}
                  helperText={`${title2.length}/120 characters`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={description}
                  onChange={(e) => setdescription(e.target.value)}
                  multiline
                  rows={3}
                />
                <TextField
                  fullWidth
                  label="Overview Description"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={description2}
                  onChange={(e) => setdescription2(e.target.value)}
                  multiline
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormControl
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  size="small"
                >
                  <InputLabel id="category-label">Category</InputLabel>
                  <Select
                    labelId="category-label"
                    id="category-select"
                    value={category}
                    onChange={(e) => setcategory(e.target.value)}
                    label="Category"
                  >
                    <MenuItem value="Meal Plan">Meal Plan</MenuItem>
                    <MenuItem value="Meditation">Meditation</MenuItem>
                    <MenuItem value="Exercises">Exercises</MenuItem>
                  </Select>
                </FormControl>

                <FormControl
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  size="small"
                >
                  <InputLabel id="difficulty-label">Difficulty</InputLabel>
                  <Select
                    labelId="difficulty-label"
                    id="difficulty-select"
                    value={difficulty}
                    onChange={(e) => setdifficulty(e.target.value)}
                    label="Difficulty"
                  >
                    <MenuItem value="Easy">Beginner</MenuItem>
                    <MenuItem value="Normal">Normal</MenuItem>
                    <MenuItem value="Hard">Advanced</MenuItem>
                  </Select>
                </FormControl>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  fullWidth
                  label="Duration (in days)"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  type="number"
                  value={duration_in_day}
                  onChange={handleDurationChange}
                />
                <TextField
                  fullWidth
                  type="number"
                  label="Times Per Week"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={times_per_week}
                  onChange={(e) => {
                    const value = e.target.value;
                    if (/^\d*$/.test(value)) {
                      settimes_per_week(value);
                    }
                  }}
                />
              </div>

              <Typography variant="h6" mt={1}>
                <div className="flex items-center justify-between w-1/2">
                  <label>Schedule</label>
                  <IconButton
                    onClick={handleAddSchedule}
                    sx={{ marginLeft: 1 }}
                  >
                    <AddIcon />
                  </IconButton>
                </div>
              </Typography>

              {schedule.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center"
                >
                  <TextField
                    fullWidth
                    label="Week Number"
                    variant="outlined"
                    margin="normal"
                    size="small"
                    value={item.weekNumber}
                    onChange={(e) =>
                      handleScheduleChange(index, "weekNumber", e.target.value)
                    }
                  />
                  <TextField
                    fullWidth
                    label="Week Description"
                    variant="outlined"
                    margin="normal"
                    size="small"
                    value={item.week_description}
                    onChange={(e) =>
                      handleScheduleChange(
                        index,
                        "week_description",
                        e.target.value
                      )
                    }
                  />
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveSchedule(index)}
                    sx={{ marginTop: "20px", width: "40px", height: "40px" }}
                  >
                    <RemoveIcon />
                  </IconButton>
                </div>
              ))}

              <div className="grid grid-cols-1 gap-4 items-center">
                <Typography variant="h6" mt={1}>
                  Photo Upload
                </Typography>
                <input
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={handlePhotoUpload}
                />
                {photoPreview && (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    style={{
                      marginTop: "10px",
                      width: "200px", // Corrected to lowercase 'width'
                      height: "200px", // Corrected to lowercase 'height'
                      borderRadius: "10px",
                    }}
                  />
                )}
              </div>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  mt: 3,
                }}
              >
                <Button type="submit" variant="contained">
                  Submit Plan
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </div>
  );
};

export default Createplan;
