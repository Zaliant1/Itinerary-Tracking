import React, { useContext } from "react";
import { UserContext } from "../context/AuthProvider";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Container,
  IconButton,
  Box,
  Tooltip,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";

const Layout = () => {
  const [user, setUser] = useContext(UserContext);
  const navigate = useNavigate();
  const logout = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
  };

  const SignInDisplay = () => {
    if (!user) {
      return (
        <React.Fragment>
          <Tooltip title="Login">
            <IconButton onClick={() => navigate("/login")} color="white">
              <LoginIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      );
    } else if (user) {
      return (
        <React.Fragment>
          <Tooltip title="Profile">
            <IconButton onClick={() => navigate("/itineraries")} color="white">
              <AccountCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton onClick={logout} color="white" sx={{ mr: 2 }}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </React.Fragment>
      );
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="navbar">
          <Toolbar>
            <Tooltip title="Home" edge="start">
              <IconButton onClick={() => navigate("/")} color="white">
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <Typography
              style={{ color: "#fff" }}
              sx={{ flexGrow: 1, textAlign: "center" }}
            >
              Trip Planner
            </Typography>
            <SignInDisplay />
          </Toolbar>
        </AppBar>
      </Box>
      <Container maxWidth="xl">
        <Outlet />
      </Container>
    </React.Fragment>
  );
};
export default Layout;
