import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../Components/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import {
  TextField,
  Button,
  Typography,
  Box,
  FormHelperText,
  InputAdornment,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axios from "axios";

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setPasswordError("");

    // Validation
    if (!currentPassword) {
      setPasswordError("Current password is required.");
      setIsSubmitting(false);
      return;
    }

    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters.");
      setIsSubmitting(false);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setPasswordError("Authentication token not found.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.put(
        "https://ecg-wv62.onrender.com/api/appAdmin/changepassword",
        {
          oldPassword: currentPassword, // ✅ correct key
          newPassword: newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // ✅ correct format
          },
        }
      );

      toast.success("Password changed successfully!", {
        position: "bottom-right",
      });
      setTimeout(() => {
        navigate("/ecg_dashboard");
      }, 2000);
      
      setCurrentPassword("");
      setNewPassword("");
    } catch (error) {
      console.error("Error:", error.response?.data?.message || error.message);
      setPasswordError(
        error.response?.data?.message || "Failed to change password. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <Header name="Change Password" />
      <div className="flex justify-center items-center mt-28">
        <Box
          sx={{
            maxWidth: 400,
            margin: "auto",
            padding: 3,
            boxShadow: 3,
            borderRadius: 2,
            backgroundColor: "#fff",
          }}
        >
          <Typography
            variant="h6"
            align="center"
            sx={{ marginBottom: 2 }}
            style={{ display: "flex", alignItems: "center", justifyContent: "center" }}
          >
            <LockIcon sx={{ fontSize: 25, marginRight: 1 }} />
            Change Password
          </Typography>

          <form>
            {/* Current Password Field */}
            <TextField
              label="Current Password"
              type={showCurrentPassword ? "text" : "password"}
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      sx={{ padding: 0, color: "#6178bc" }}
                    >
                      {showCurrentPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  </InputAdornment>
                ),
              }}
            />

            {/* New Password Field */}
            <TextField
              label="New Password"
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              fullWidth
              margin="normal"
              required
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      sx={{ padding: 0 , color: "#6178bc"}}
                    >
                      {showNewPassword ? <VisibilityOff /> : <Visibility />}
                    </Button>
                  </InputAdornment>
                ),
              }}
            />

            {/* Error Message */}
            {passwordError && (
              <FormHelperText error sx={{ mt: 1 }}>
                {passwordError}
              </FormHelperText>
            )}

            {/* Submit Button */}
            <Button
              variant="contained"
              fullWidth
              onClick={handleSubmit}
              sx={{ marginTop: 2, backgroundColor: "#6178bc", borderRadius: "5px" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Changing..." : "Change Password"}

            </Button>
          </form>
        </Box>
        <ToastContainer />
      </div>
    </div>
  );
};

export default ChangePassword;
