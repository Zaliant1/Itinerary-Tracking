import React, { useContext, useEffect } from "react";
import { UserContext } from "../context/AuthProvider";

const Header = () => {
  const [user, setUser] = useContext(UserContext);

  // console.log(user);
  useEffect(() => {
    // if (user) {
    fetch(`/itineraries/${user.id}`, {
      headers: {
        authorization: user.session_id,
      },
    }).then((data) => {
      data.json().then((res) => {
        console.log(res);
      });
    });
    // }
  });

  if (!user) {
    return null;
  }

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
