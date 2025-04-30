import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {
  CircularProgress,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Chip,
  Box,
} from "@mui/material";
import Header from "../Components/Header";

const UserDetails = () => {
  const location = useLocation();
  const userId = location.state?.userId;

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("User ID not found in navigation.");
      setLoading(false);
      return;
    }

    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `https://ecg-wv62.onrender.com/api/appAdmin/user-with-family/${userId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setUserData(res.data.data);
        console.log("User Details Response:", res.data.data);
      } catch (err) {
        console.error("Error fetching user details:", err);
        setError("Failed to load user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" align="center" mt={5} variant="h6">
        {error}
      </Typography>
    );
  }

  const { mainUser, familyMembers } = userData;

  return (
    <>
      <Header name="User Details" />
      <Box p={4}>
        {/* User Information Section */}
        <Card elevation={3} sx={{ mb: 4 }}>
        <CardHeader title={<div className="font-semibold text-xl">User Information</div>} />


          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Name:</strong> {mainUser.full_name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Email:</strong> {mainUser.email}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Phone:</strong> {mainUser.phoneNumber}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body1">
                  <strong>Status:</strong>{" "}
                    <Chip
                      label={mainUser.status}
                      color={mainUser.status === "active" ? "success" : "error"}
                    />
                </Typography>
              </Grid>
            </Grid>
          </CardContent>
        </Card>

        {/* Family Members Section */}
        <Card elevation={3}>
          <CardHeader title={<div className="font-semibold text-xl">Family Member</div>} />
          <Divider />
          <CardContent>
            {familyMembers && familyMembers.length > 0 ? (
              familyMembers.map((member, index) => (
                <Card
                  key={index}
                  elevation={1}
                  sx={{
                    mb: 2,
                    p: 2,
                    backgroundColor: "#f9f9f9",
                    borderRadius: 2,
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2">
                        <strong>Name:</strong> {member.full_name}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2">
                        <strong>Relation:</strong> {member.relation}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2">
                        <strong>Age:</strong> {member.age}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2">
                        <strong>Gender:</strong> {member.gender}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2">
                        <strong>Weight:</strong> {member.weight} kg
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <Typography variant="body2">
                        <strong>Height:</strong> {member.height} cm
                      </Typography>
                    </Grid>
                  </Grid>
                </Card>
              ))
            ) : (
              <Typography>No family members found.</Typography>
            )}
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default UserDetails;
