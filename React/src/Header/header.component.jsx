import React, { useContext } from "react";
import { UserContext } from "../context/AuthProvider";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "./header.styles.css";

const Header = () => {
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
        <Link to="/login">
          <h3>Sign in</h3>
        </Link>
      );
    } else if (user) {
      return <h3 onClick={logout}>Sign out</h3>;
    }
  };

  return (
    <div>
      <section>
        <div className="nav">
          <Link to="/">
            <h3>Home</h3>
          </Link>
          <Link to={`/itineraries/`}>
            <h3>Your Profile</h3>
          </Link>
          <Link to="/register">
            <h3>Register</h3>
          </Link>
          <SignInDisplay />
        </div>
      </section>
      <Outlet />
    </div>
  );
};
export default Header;
