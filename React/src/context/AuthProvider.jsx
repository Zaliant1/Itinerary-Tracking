import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export const UserProvider = (props) => {
  const [user, setUserState] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  const setUser = (newUser) => {
    localStorage.setItem("user", JSON.stringify(newUser));
    setUserState(newUser);
  };

  return (
    <UserContext.Provider value={[user, setUser]}>
      {props.children}
    </UserContext.Provider>
  );
};
