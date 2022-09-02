import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import "./registration.styles.css";

const RegistrationForm = () => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [resData, setResData] = useState(null);
  // let registrationInfo = { object: email };
  // let registrationInfo = [email, password, confirmPassword];

  // useEffect(() => {
  //   fetch(`/registration/${registrationInfo}`).then((response) => {
  //     console.log("response", response);
  //     setResData(registrationInfo);
  //   });
  // }, []);

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
      <div class="footer">
        <button type="submit" class="btn" onClick={() => handleSubmit()}>
          Register
        </button>
      </div>
      <div>
        <h1>hi {resData}</h1>
      </div>
    </div>
  );
};
export default RegistrationForm;
