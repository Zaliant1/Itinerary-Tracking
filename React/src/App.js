// import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Layout from "./Layout/layout.component";
import RegistrationForm from "./RegistrationForm/registration.component";
import Login from "./Login/login.component.jsx";
import Itineraries from "./Itineraries/itineraries.component";
import { Homepage } from "./Homepage/homepage.component";
import { UserProvider } from "./context/AuthProvider";
import { Itinerary } from "./Itinerary/itinerary.component";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import "./App.css";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <BrowserRouter>
          <UserProvider>
            <Layout />
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/register" element={<RegistrationForm />} />
              <Route path="/login" element={<Login />} />
              <Route path="/itineraries" element={<Itineraries />} />
              <Route path="/itinerary/:itinerary_id" element={<Itinerary />} />
            </Routes>
          </UserProvider>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
};

export default App;
