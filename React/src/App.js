import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Header from "./Header/header";
import RegistrationForm from "./RegistrationForm/registration.component";
import Login from "./Login/login.component.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Header />} />
        <Route path="/register" element={<RegistrationForm />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// const HomePage = () => {
//   return (
//     <Container fluid="md">
//       <h1>
//         <Link to="/">Home Page</Link>
//       </h1>
//       <SearchComponent />
//       <Outlet />
//     </Container>
//   );
// };

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         <Route path="/" element={<HomePage />}>
//           <Route path="search/:title" element={<MovieComponent />} />
//           <Route path="movie/:title" element={<MovieDetails />} />
//           <Route path="cast/:castmember" element={<CastMemberComponent />} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };
