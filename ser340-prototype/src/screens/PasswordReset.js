import React, { useState } from "react";

function PasswordReset() {
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaved(false);

    if (!email || !oldPassword || !newPassword || !confirmPassword) {
      setError("Please fill out all fields.");
      return;
    }

    if (!email.endsWith("@qu.edu")) {
      setError("Please use your @qu.edu email address.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match.");
      return;
    }

    // pretend to save the new password
    console.log({
      email,
      oldPassword,
      newPassword,
    });

    setSaved(true);
  }

  return (
    <div className="login-container">
      <div className="login-card reset-card">
        <h1 className="reset-title">Change Password</h1>

        <form onSubmit={handleSubmit} className="reset-form">
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

          {error && <p className="reset-error">{error}</p>}
          {saved && (
            <p className="reset-saved">
              Password updated successfully. You can now continue to the app.
            </p>
          )}

          <div className="reset-submit-row">
            <button type="submit" className="reset-submit-btn">
              Save password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PasswordReset;
