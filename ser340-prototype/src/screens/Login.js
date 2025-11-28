import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  //for nav.
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    //makes sure email and password fields are filled and not empty.
    //throws error if not
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    //makes sure quinnipaic email is used.
    //throws error if not.
    if (!email.endsWith("@qu.edu")) {
      setError("Please use your @qu.edu email address.");
      return;
    }

    //should eeventually navigate to dash board after logged in.
  }

  //actual screen components
  return (
    //conainer for login components.
    <div className="login-container">
      <div className="login-card">
        <h1 className="login-title">Login</h1>

        <form onSubmit={handleLogin} className="login-form">
          <label className="login-label">
            QU Email:
            <input
              type="email"
              className="login-input"
              placeholder="firstname.lastname@qu.edu"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>

          <label className="login-label">
            Password:
            <input
              type="password"
              className="login-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && <p className="login-error">{error}</p>}

          <div className="login-actions">
            <button type="submit" className="login-btn">
              Login
            </button>

            <button
              type="button"
              className="login-forgot"
              onClick={() => navigate("/reset")}
            >
              Forgot password?
            </button>
          </div>

          <p className="login-hint">
            *First time users: use temporary password provided for you
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
