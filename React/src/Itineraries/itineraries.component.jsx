import React, { useContext } from "react";
import { UserContext } from "../context/AuthProvider";

const Itineraries = () => {
  const [user, setUser] = useContext(UserContext);
  return (
    <p>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </p>
  );
};

export default Itineraries;
