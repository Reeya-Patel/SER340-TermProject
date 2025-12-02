import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // for going back to login

function PasswordReset() {
  const navigate = useNavigate();

  // form fields
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // error + success messages
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  // handle submit button
  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaved(false);

    // check for empty fields
    if (!email || !oldPassword || !newPassword || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }

    // must use QU email
    if (!email.endsWith("@qu.edu")) {
      setError("Please use your @qu.edu email address.");
      return;
    }

    // password length check
    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    // confirm password must match
    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    // pretend password is updated
    console.log({
      email,
      oldPassword,
      newPassword,
    });

    setSaved(true); // shows success message + return button
  }

  return (
    // main container
    <div className="login-container">
      <div className="login-card reset-card">
        <h1 className="reset-title">Change Password</h1>

        <form onSubmit={handleSubmit} className="reset-form">
          {/* email field */}
          <div className="reset-group">
            <label className="reset-label">
              QU Email:
              <input
                type="email"
                className="reset-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>
          </div>

          {/* old / temporary password */}
          <div className="reset-group">
            <label className="reset-label">
              Old/temporary password:
              <input
                type="password"
                className="reset-input"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </label>
          </div>

          <hr className="reset-divider" />

          {/* new password */}
          <div className="reset-group">
            <label className="reset-label">
              New password:
              <input
                type="password"
                className="reset-input"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </label>
          </div>

          {/* confirm password */}
          <div className="reset-group">
            <label className="reset-label">
              Confirm password:
              <input
                type="password"
                className="reset-input"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </label>
          </div>

          {/* error message */}
          {error && <p className="reset-error">{error}</p>}

          {/* success message */}
          {saved && (
            <p className="reset-saved">
              Password updated successfully. You can now continue to the app.
            </p>
          )}

          {/* save button */}
          <div className="reset-submit-row">
            <button type="submit" className="reset-submit-btn">
              Save password
            </button>
          </div>

          {/* back to login button (only shows after success) */}
          {saved && (
            <div className="reset-submit-row" style={{ marginTop: "1rem" }}>
              <button
                type="button"
                className="reset-submit-btn"
                onClick={() => navigate("/")}
                style={{ background: "#ddd", color: "#002b5c" }}
              >
                Back to Login
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default PasswordReset;
