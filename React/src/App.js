import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Header/header";
import RegistrationForm from "./RegistrationForm/registration.component";
import Login from "./Login/login.component.jsx";
import Itineraries from "./Itineraries/itineraries.component";
import { UserProvider } from "./context/AuthProvider";

const App = () => {
  return (
    <BrowserRouter>
      <UserProvider>
        <Routes>
          <Route path="/" element={<Header />} />
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/itineraries" element={<Itineraries />} />
        </Routes>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
