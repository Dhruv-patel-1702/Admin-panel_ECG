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
  import axios from "axios";
  import { ToastContainer, toast } from "react-toastify";
  import "react-toastify/dist/ReactToastify.css";

  const Createplan = (props) => {
    const navigate = useNavigate();
    const [title, settitle] = useState("");
    const [title2, settitle2] = useState("");
    const [photo, setphoto] = useState(null);
    const [photoPreview, setPhotoPreview] = useState(null);
    const [category, setcategory] = useState("");
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
        toast.warning("Please upload a valid JPEG or PNG image.", {
          position: "bottom-right",
        });
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
    
      if (title.length > 120) {
        toast.warning("Title must be less than or equal to 120 characters.", {
          position: "bottom-right",
        });
        return;
      }
    
      if (!/^\d+$/.test(duration_in_day)) {
        toast.warning("Duration (in days) must be a valid number.", {
          position: "bottom-right",
        });
        return;
      }
    
      if (!photo) {
        toast.warning("Please upload a photo.", {
          position: "bottom-right",
        });
        return;
      }
    
      if (schedule.length === 0) {
        toast.warning("Please add at least one week to the schedule.", {
          position: "bottom-right",
        });
        return;
      }
    
      const formData = new FormData();
      formData.append("title", title);
      formData.append("title2", title2);
      formData.append("photo", photo);  // The photo will automatically be converted to binary when sending
    
      // Log the FormData to check the binary data (optional)
     
    
      formData.append("category", category);
      formData.append("description", description);
      formData.append("description2", description2);
      formData.append("duration_in_day", duration_in_day);
      formData.append("times_per_week", times_per_week);
      formData.append("difficulty", difficulty);
    
      schedule.forEach((item, index) => {
        formData.append(`schedule[${index}][weekNumber]`, item.weekNumber);
        formData.append(`schedule[${index}][week_description]`, item.week_description);
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
          toast.success("Plan successfully created!");
          setTimeout(() => {
            navigate("/addplan");
          }, 2000);
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
        <ToastContainer position="bottom-right" />
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
                      <MenuItem value="Beginner">Beginner</MenuItem>
                      <MenuItem value="Normal">Normal</MenuItem>
                      <MenuItem value="Advanced">Advanced</MenuItem>
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
                    value={duration_in_day}
                    onChange={handleDurationChange}
                  />
                  <TextField
                    fullWidth
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
                      type="number"
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
