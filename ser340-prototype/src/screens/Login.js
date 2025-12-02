import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  // for nav.
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // first-time user state
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [tempPassword, setTempPassword] = useState("");

  function handleFirstTimeChange(e) {
    const checked = e.target.checked;
    setIsFirstTime(checked);
    setError("");

    if (checked) {
      // simple, easy temp password for the prototype
      const temp = "Temp1234!";
      setTempPassword(temp);
      setPassword(temp); // pre-fill password field so user can see it
    } else {
      setTempPassword("");
      setPassword("");
    }
  }

  function handleLogin(e) {
    e.preventDefault();
    setError("");

    // makes sure email and password fields are filled and not empty.
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    // makes sure Quinnipiac email is used.
    if (!email.endsWith("@qu.edu")) {
      setError("Please use your @qu.edu email address.");
      return;
    }

    // NOTE: in a real app we'd check password against a backend.
    // For this prototype we just branch based on first-time vs returning.

    if (isFirstTime) {
      // first-time users go to change password screen
      navigate("/reset", { state: { email } });
    } else {
      // returning users go to the dashboard
      navigate("/dashboard");
    }
  }

  // actual screen components
  return (
    // container for login components.
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

          {/* first-time user option */}
          <div className="login-first-time-row">
            <label className="login-first-time-checkbox">
              <input
                type="checkbox"
                checked={isFirstTime}
                onChange={handleFirstTimeChange}
              />
              I'm a first-time user (generate a temporary password)
            </label>

            {isFirstTime && (
              <p className="login-temp-password">
                Temporary password:{" "}
                <span className="login-temp-password-value">
                  {tempPassword}
                </span>
              </p>
            )}
          </div>

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
            *First time users: select &quot;I'm a first-time user&quot; to
            receive a temporary password, then update it on the Change Password
            screen.
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
