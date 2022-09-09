import React, { useState, useContext } from "react";
import { UserContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  Button,
  TextField,
  Container,
  Box,
  Alert,
  Card,
  CardContent,
  Typography,
} from "@mui/material";

const RegistrationForm = () => {
  const [error, setError] = useState();
  const [userForm, setUserForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [user, setUser] = useContext(UserContext);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const newState = { ...userForm };
    newState[e.target.id] = e.target.value;
    setUserForm(newState);
  };

  const handleSubmit = () => {
    if (userForm.password !== userForm.confirmPassword) {
      setError("Passwords do not match");
    } else {
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: userForm.email,
          password: userForm.password,
        }),
      }).then((res) => {
        if (res.status === 422) {
          res.json().then((data) => {
            setError(data.detail);
          });
        } else if (res.status === 200) {
          res.json().then((user) => {
            setUser(user);
            navigate("/itineraries");
          });
        }
      });
    }
  };

  return (
    <React.Fragment>
      <Container sx={{ mt: 2 }}>
        {error ? (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Alert>
        ) : null}
        <Card>
          <CardContent>
            <Typography variant="h5">Sign Up</Typography>
            <Box component="form">
              <Box>
                <TextField
                  color="primary"
                  label="Email"
                  variant="standard"
                  id="email"
                  sx={{ mr: 2, flexGrow: 1 }}
                  onChange={(e) => handleInputChange(e)}
                  value={userForm.email}
                />
              </Box>
              <TextField
                color="primary"
                label="Password"
                variant="standard"
                type="password"
                id="password"
                onChange={(e) => handleInputChange(e)}
                value={userForm.password}
                sx={{ mr: 2 }}
              />
              <TextField
                color="primary"
                label="Confirm Password"
                variant="standard"
                type="password"
                id="confirmPassword"
                onChange={(e) => handleInputChange(e)}
                value={userForm.confirmPassword}
              />
            </Box>
            <Box sx={{ textAlign: "left", mt: 2 }}>
              <Button variant="contained" sx={{ mr: 2 }} onClick={handleSubmit}>
                Submit
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  );
};
export default RegistrationForm;
