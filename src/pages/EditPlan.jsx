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
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
          difficulty: plan.difficulty,
          category: plan.category,
          photo: plan.photo,
        });
        
        setSchedule(plan.schedule || []);
        setPhotoPreview(plan.photo);
      } catch (error) {
        console.error("Failed to load plan", error);
      }
    };

    fetchPlan();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict title and title2 to 120 characters
    if ((name === "title" || name === "title2") && value.length > 120) {
      
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
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
    if (field === "weekNumber" && !/^\d*$/.test(value)) return;
    setSchedule((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const {
      title,
      title2,
      description,
      description2,
      duration_in_day,
      times_per_week,
      difficulty,
      category,
      photo,
    } = formData;

    if (
      !title ||
      !title2 ||
      !description ||
      !description2 ||
      !duration_in_day ||
      !times_per_week ||
      !difficulty ||
      !category ||
      !photo
    ) {
      toast.error("Please fill all required fields!");
      return;
    }

   

    if (schedule.some((item) => !item.weekNumber || !item.week_description)) {
      toast.error("Please complete all schedule fields!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const fd = new FormData();

      fd.append("title", title);
      fd.append("title2", title2);
      fd.append("photo", photo);
      fd.append("category", category);
      fd.append("description", description);
      fd.append("description2", description2);
      fd.append("duration_in_day", duration_in_day);
      fd.append("times_per_week", times_per_week);
      fd.append("difficulty", difficulty);

      schedule.forEach((item, index) => {
        fd.append(`schedule[${index}][weekNumber]`, item.weekNumber);
        fd.append(`schedule[${index}][week_description]`, item.week_description);
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

      toast.success("Plan updated successfully!");
      setTimeout(() => {
        navigate("/addplan");
      }, 2000); // 1 second delay
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Update failed!");
    }
  };

  return (
    <div>
      <Header name="Edit Plan" />
      <Box sx={{ display: "flex", justifyContent: "center", pt: 0 }}>
        <Container maxWidth="md">
          <Paper sx={{ padding: 4, borderRadius: 3, boxShadow: "none" }}>
            <form onSubmit={handleSubmit}>
              <Typography variant="h5" mb={2} fontWeight="bold">
                Edit Plan
              </Typography>

              {/* Title Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <TextField
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  fullWidth
                  helperText={`${formData.title.length}/120 characters`}
                  size="small"
                />
                <TextField
                  label="Overview Title"
                  name="title2"
                  value={formData.title2}
                  onChange={handleChange}
                  fullWidth
                  helperText={`${formData.title2.length}/120 characters`}
                  size="small"
                />
              </div>

              {/* Description Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <TextField
                  label="Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Overview Description"
                  name="description2"
                  value={formData.description2}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  fullWidth
                  size="small"
                />
              </div>

              {/* Dropdown Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <FormControl fullWidth size="small">
                  <InputLabel>Category</InputLabel>
                  <Select
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
                <FormControl fullWidth size="small">
                  <InputLabel>Difficulty</InputLabel>
                  <Select
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

              {/* Number Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <TextField
                  label="Duration (in days)"
                  name="duration_in_day"
                  value={formData.duration_in_day}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                  size="small"
                />
                <TextField
                  label="Times Per Week"
                  name="times_per_week"
                  value={formData.times_per_week}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                  size="small"
                />
              </div>

              {/* Schedule Fields */}
              <Typography variant="h6" mt={3}>
                <div className="flex items-center justify-between w-1/2">
                  <label>Schedule</label>
                  <IconButton onClick={handleAddSchedule}>
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
                    label="Week Number"
                    value={item.weekNumber}
                    onChange={(e) =>
                      handleScheduleChange(index, "weekNumber", e.target.value)
                    }
                    fullWidth
                    size="small"
                  />
                  <TextField
                    label="Week Description"
                    value={item.week_description}
                    onChange={(e) =>
                      handleScheduleChange(index, "week_description", e.target.value)
                    }
                    fullWidth
                    size="small"
                  />
                  <IconButton
                    color="error"
                    onClick={() => handleRemoveSchedule(index)}
                    sx={{ mt: 1 }}
                  >
                    <RemoveIcon />
                  </IconButton>
                </div>
              ))}

              {/* Photo Upload */}
              <div className="mt-4">
                <Typography variant="h6">Photo Upload</Typography>
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

              {/* Submit Button */}
              <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
                <Button type="submit" variant="contained">
                  Update Plan
                </Button>
              </Box>
            </form>
          </Paper>
        </Container>
      </Box>
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default EditPlan;
