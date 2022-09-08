import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../context/AuthProvider";
import { useParams, useNavigate } from "react-router-dom";

import "./registration.styles.css";

const RegistrationForm = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [user, setUser] = useContext(UserContext);

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { id, value } = e.target;

    if (id === "email") {
      setEmail(value);
      console.log(value);
    }
    if (id === "password") {
      setPassword(value);
    }
    if (id === "confirmPassword") {
      setConfirmPassword(value);
    }
  };

  const handleSubmit = () => {
    console.log(email, password, confirmPassword);

    if (password !== confirmPassword) {
      alert("passwords do not match");
    } else {
      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email: email, password: password }),
      }).then((res) => {
        if (res.status === 422) {
          res.json().then((data) => {
            alert(data.detail);
          });
        } else if (res.status === 200) {
          res.json().then((user) => {
            setUser(user);
            navigate("/itineraries");
          });
        }
      });
    }
  };

  return (
    <div className="form">
      <div className="form-body">
        <div className="email">
          <label className="form__label" for="email">
            Email{" "}
          </label>
          <input
            type="email"
            id="email"
            className="form__input"
            placeholder="Email"
            value={email}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="password">
          <label className="form__label" for="password">
            Password{" "}
          </label>
          <input
            className="form__input"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
        <div className="confirm-password">
          <label className="form__label" for="confirmPassword">
            Confirm Password{" "}
          </label>
          <input
            className="form__input"
            type="password"
            id="confirmPassword"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => handleInputChange(e)}
          />
        </div>
      </div>
      <div className="footer">
        <button type="submit" className="btn" onClick={() => handleSubmit()}>
          Register
        </button>
      </div>
    </div>
  );
};
export default RegistrationForm;
