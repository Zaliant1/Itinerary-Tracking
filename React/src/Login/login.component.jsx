import { useState, useContext, Fragment } from "react";
import { UserContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  Container,
  Typography,
  Box,
  TextField,
  Alert,
} from "@mui/material";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setErrorMessage] = useState();
  const [user, setUser] = useContext(UserContext);

  const handleSubmit = () => {
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then((res) => {
      if (res.status === 403) {
        res.json().then((data) => {
          setErrorMessage(data.detail);
        });
      } else if (res.status === 200) {
        res.json().then((user) => {
          setUser(user);
          navigate("/itineraries");
        });
      }
    });
  };

  return (
    <Fragment>
      <Container sx={{ mt: 2 }}>
        {error ? (
          <Alert severity="error" sx={{ mt: 2, mb: 2 }}>
            {error}
          </Alert>
        ) : null}
        <Card>
          <CardContent>
            <Typography variant="h5">Login</Typography>
            <Box component="form">
              <TextField
                color="primary"
                label="Email"
                variant="standard"
                sx={{ mr: 2 }}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <TextField
                color="primary"
                label="Password"
                variant="standard"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </Box>
            <Box sx={{ textAlign: "left", mt: 2 }}>
              <Button variant="contained" sx={{ mr: 2 }} onClick={handleSubmit}>
                Submit
              </Button>
              <Button variant="contained" onClick={() => navigate("/register")}>
                Sign Up
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Fragment>
  );
};

export default Login;
