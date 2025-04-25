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

const Createplan = (props) => {
  const navigate = useNavigate();
  const [title, settitle] = useState("");
  const [title2, settitle2] = useState("");
  const [photo, setphoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null); // For displaying the photo preview
  const [categoty, setcategoty] = useState("");
  const [description, setdescription] = useState("");
  const [description2, setdescription2] = useState("");
  const [duration_in_day, setduration_in_day] = useState("");
  const [times_per_week, settimes_per_week] = useState("");
  const [difficulty, setdifficulty] = useState("");
  const [schedule, setSchedule] = useState([]); // Array to manage schedule items

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];

    // Validate file type
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      setphoto(file); // Set the uploaded file
      setPhotoPreview(URL.createObjectURL(file)); // Generate a preview URL
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

  const handleSubmit = (event) => {
    event.preventDefault();

    const newPlan = {
      title,
      title2,
      photo,
      categoty,
      description,
      description2,
      duration_in_day,
      times_per_week,
      difficulty,
      schedule,
    };

    console.log("Plan submitted:", newPlan);
    navigate("/addplan");
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
                  onChange={(e) => settitle(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Overview Title"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={title2}
                  onChange={(e) => settitle2(e.target.value)}
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
                  multiline // Enables textarea functionality
                  rows={3} // Sets the number of visible rows
                />
                <TextField
                  fullWidth
                  label="Overview Description"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={description2}
                  onChange={(e) => setdescription2(e.target.value)}
                  multiline // Enables textarea functionality
                  rows={3} // Sets the number of visible rows
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
                    value={categoty}
                    onChange={(e) => setcategoty(e.target.value)}
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
                  value={duration_in_day}
                  onChange={(e) => setduration_in_day(e.target.value)}
                />
                <TextField
                  fullWidth
                  label="Times Per Week"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  value={times_per_week}
                  onChange={(e) => settimes_per_week(e.target.value)}
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
                    label={`Week Number ${index + 1}`}
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
                    label={`Week Description ${index + 1}`}
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
                    onClick={() => handleRemoveSchedule(index)}
                    sx={{ marginTop: 2, width: "40px" }}
                  >
                    <RemoveIcon />
                  </IconButton>
                </div>
              ))}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4" mt={2}>
                <div>
                  <Typography
                    variant="body1"
                    sx={{ marginBottom: 1, fontWeight: "bold" }}
                  >
                    Upload Photo
                  </Typography>
                  <input
                    type="file"
                    accept="image/jpeg, image/png"
                    onChange={handlePhotoUpload}
                    style={{ display: "block", marginBottom: "16px" }}
                  />
                  {photoPreview && (
                    <div>
                      <img
                        src={photoPreview}
                        alt="Preview"
                        style={{
                          width: "100px",
                          height: "100px",
                          objectFit: "cover",
                          marginTop: "8px",
                          borderRadius: "8px",
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: "#6178bc",
                  ":hover": { backgroundColor: "#50639e" },
                  mt: 2,
                  width: "20%",
                  display: "flex",
                  marginX: "auto",
                }}
                fullWidth
              >
                Submit
              </Button>
            </form>
          </Paper>
        </Container>
      </Box>
    </div>
  );
};

export default Createplan;
