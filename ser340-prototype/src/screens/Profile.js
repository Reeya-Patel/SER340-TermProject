import React, { useState } from "react";

function Profile() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("None");
  const [department, setDepartment] = useState("None");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaved(false);

    if (!name) {
      setError("Please enter your name.");
      return;
    }

    if (role === "None") {
      setError("Please select a role.");
      return;
    }

    if (department === "None") {
      setError("Please select a department.");
      return;
    }

    setSaved(true);

    console.log({
      name,
      role,
      department,
      bio,
    });
  }

  return (
    <div className="login-container">
      <div className="login-card profile-card">
        <h1 className="profile-title">Profile Setup</h1>

        <form onSubmit={handleSubmit} className="profile-form">
          {/* NAME */}
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

          {/* ROLE */}
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

          {/* DEPARTMENT */}
          <div className="profile-group">
            <label className="profile-label">
              Department:
              <select
                className="profile-select"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="None">None</option>

                {/* QU Academic Departments */}
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

          {/* BIO */}
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

          {/* ERRORS */}
          {error && <p className="profile-error">{error}</p>}
          {saved && (
            <p className="profile-saved">Profile saved successfully.</p>
          )}

          {/* BUTTON */}
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
