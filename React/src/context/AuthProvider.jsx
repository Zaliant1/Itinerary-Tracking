import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({});

export const UserProvider = (props) => {
  const [user, setUserState] = useState(
    JSON.parse(localStorage.getItem("user"))
  );

  useEffect(() => {
    if (
      !user &&
      window.location.pathname !== "/login" &&
      window.location.pathname !== "/register"
    ) {
      window.location.href = "/login";
    }
  }, [user]);

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
