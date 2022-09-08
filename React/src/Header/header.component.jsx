import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/AuthProvider";
import { Link, Outlet } from "react-router-dom";
import "./header.styles.css";

const Header = () => {
  const [user, setUser] = useContext(UserContext);
  const logout = () => {
    setUser(null);
    localStorage.clear();
  };

  // console.log(user);

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
          <Link to="/login">
            <h3>sign in</h3>
          </Link>

          <h3 onClick={logout}>sign out</h3>
        </div>
      </section>
      <Outlet />
    </div>
  );
};
export default Header;
