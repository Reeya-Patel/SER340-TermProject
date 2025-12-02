import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [role, setRole] = useState("None");
  const [department, setDepartment] = useState("None");
  const [bio, setBio] = useState("");

  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  // load saved profile on mount
  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      const p = JSON.parse(stored);
      setName(p.name || "");
      setRole(p.role || "None");
      setDepartment(p.department || "None");
      setBio(p.bio || "");
    }
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaved(false);

    if (!name) return setError("Please enter your name.");
    if (role === "None") return setError("Please select a role.");
    if (department === "None") return setError("Please select a department.");

    const profileData = { name, role, department, bio };
    localStorage.setItem("userProfile", JSON.stringify(profileData));

    // mark profile as completed
    localStorage.setItem("profileCompleted", "true");

    setSaved(true);

    navigate("/dashboard");
  }

  return (
    <div className="login-container">
      <div className="login-card profile-card">
        {/* back button */}
        <button
          type="button"
          className="feedback-back-btn"
          onClick={() => navigate("/dashboard")}
        >
          ← Back to Dashboard
        </button>

        <h1 className="profile-title">Profile Setup</h1>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="profile-group">
            <label className="profile-label">
              Name:
              <input
                type="text"
                className="profile-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          </div>

          <div className="profile-group">
            <label className="profile-label">
              Role:
              <select
                className="profile-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="None">None</option>
                <option value="Student">Student</option>
                <option value="Professor">Professor</option>
              </select>
            </label>
          </div>

          <div className="profile-group">
            <label className="profile-label">
              Department:
              <select
                className="profile-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="None">None</option>
                <option value="Biology">Biology</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Software Engineering">
                  Software Engineering
                </option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Business Administration">
                  Business Administration
                </option>
                <option value="Accounting">Accounting</option>
                <option value="Finance">Finance</option>
                <option value="Marketing">Marketing</option>
                <option value="Nursing">Nursing</option>
                <option value="Health Sciences">Health Sciences</option>
                <option value="Psychology">Psychology</option>
                <option value="Sociology">Sociology</option>
                <option value="Criminal Justice">Criminal Justice</option>
                <option value="Political Science">Political Science</option>
                <option value="Engineering">Engineering</option>
                <option value="Education">Education</option>
                <option value="Communications">Communications</option>
                <option value="Physical Therapy">Physical Therapy</option>
                <option value="Occupational Therapy">
                  Occupational Therapy
                </option>
                <option value="Radiologic Sciences">Radiologic Sciences</option>
                <option value="Biomedical Sciences">Biomedical Sciences</option>
                <option value="Law">Law</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>

          <div className="profile-group">
            <label className="profile-label">
              Biography:
              <textarea
                className="profile-textarea"
                rows={4}
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </label>
          </div>

          {error && <p className="profile-error">{error}</p>}
          {saved && <p className="profile-saved">Profile saved!</p>}

          <div className="profile-submit-row">
            <button type="submit" className="profile-submit-btn">
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Profile;
