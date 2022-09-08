import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/AuthProvider";

const Header = () => {
  const [user, setUser] = useContext(UserContext);

  // console.log(user);

  return (
    <nav className="bg-dark navbar-dark navbar">
      <div className="row col-12 d-flex justify-content-center text-white">
        <h3>Registration</h3>
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </nav>
  );
};
export default Header;
