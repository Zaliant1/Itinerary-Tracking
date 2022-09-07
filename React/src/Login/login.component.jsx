import { useRef, useState, useEffect, useContext, Fragment } from "react";
import { UserContext } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const userRef = useRef();
  const errRef = useRef();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    }).then((res) => {
      if (res.status === 403) {
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
  };

  return (
    <Fragment>
      {success ? (
        <section>
          <h1> You are logged in!</h1>
          <br />
          <p>
            <a href="/userpage">Go to Home</a>
          </p>
        </section>
      ) : (
        <div>
          <p ref={errRef} className={errMsg}>
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Username:</label>
            <input
              type="text"
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
            <button>Sign In</button>
          </form>
          <p>
            Need an Account?
            <br />
            <span className="line">
              {/* put router link here*/}
              <a href="/register">Sign Up</a>
            </span>
          </p>
        </div>
      )}
    </Fragment>
  );
};

export default Login;
