import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import Header from "../Components/Header";
import axios from "axios";

const EditPlan = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    title2: "",
    description: "",
    description2: "",
    duration_in_day: "",
    times_per_week: "",
    difficulty: "",
    category: "",
    photo: "",
  });
  const [schedule, setSchedule] = useState([]);
  const [photoPreview, setPhotoPreview] = useState(null);

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get(
          `https://ecg-wv62.onrender.com/api/plan/getById/${id}`,
          {
            headers: { Authorization: token },
          }
        );
        const plan = res.data.data || res.data.plan || res.data;
        setFormData({
          title: plan.title,
          title2: plan.title2,
          description: plan.description,
          description2: plan.description2,
          duration_in_day: plan.duration_in_day,
          times_per_week: plan.times_per_week,
          week_description: plan.week_description,
          weekNumber: plan.weekNumber,
          difficulty: plan.difficulty,
          category: plan.category,
          photo: plan.photo,
        });
        console.log(plan.category);
        setSchedule(plan.schedule || []);
        setPhotoPreview(plan.photo);
      } catch (error) {
        console.error("Failed to load plan", error);
      }
    };

    fetchPlan();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePhotoUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, photo: file }));
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleAddSchedule = () => {
    setSchedule((prev) => [...prev, { weekNumber: "", week_description: "" }]);
  };

  const handleRemoveSchedule = (index) => {
    setSchedule((prev) => prev.filter((_, i) => i !== index));
  };

  const handleScheduleChange = (index, field, value) => {
    setSchedule((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const fd = new FormData(); // <-- renamed to avoid confusion

      fd.append("title", formData.title);
      fd.append("title2", formData.title2);
      fd.append("photo", formData.photo);
      fd.append("category", formData.category);
      fd.append("description", formData.description);
      fd.append("description2", formData.description2);
      fd.append("duration_in_day", formData.duration_in_day);
      fd.append("times_per_week", formData.times_per_week);
      fd.append("difficulty", formData.difficulty);

      schedule.forEach((item, index) => {
        fd.append(`schedule[${index}][weekNumber]`, item.weekNumber);
        fd.append(
          `schedule[${index}][week_description]`,
          item.week_description
        );
      });

      await axios.put(
        `https://ecg-wv62.onrender.com/api/plan/update/${id}`,
        fd,
        {
          headers: {
            Authorization: token,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Plan updated successfully!");
      navigate("/addplan");
    } catch (err) {
      console.error("Update failed", err);
      alert("Update failed");
    }
  };

  return (
    <div>
      <Header
        name="Edit Plan"
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
                Edit Plan
              </Typography>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  fullWidth
                  label="Title"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  helperText={`${formData.title.length}/120 characters`}
                />
                <TextField
                  fullWidth
                  label="Overview Title"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  name="title2"
                  value={formData.title2}
                  onChange={handleChange}
                  helperText={`${formData.title2.length}/120 characters`}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  fullWidth
                  label="Description"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={3}
                />
                <TextField
                  fullWidth
                  label="Overview Description"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  name="description2"
                  value={formData.description2}
                  onChange={handleChange}
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
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
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
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
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
                  name="duration_in_day"
                  value={formData.duration_in_day}
                  onChange={handleChange}
                  type="number"
                />
                <TextField
                  fullWidth
                  type="number"
                  label="Times Per Week"
                  variant="outlined"
                  margin="normal"
                  size="small"
                  name="times_per_week"
                  value={formData.times_per_week}
                  onChange={handleChange}
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
                      width: "200px",
                      height: "200px",
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
                  Update Plan
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
    </div>
  );
};

export default EditPlan;
