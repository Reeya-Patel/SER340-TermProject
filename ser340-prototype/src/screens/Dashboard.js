import React, { useState, useEffect } from "react";

function Dashboard() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    // pull the saved profile
    const storedProfile = localStorage.getItem("userProfile");

    if (storedProfile) {
      const profile = JSON.parse(storedProfile);
      setUserName(profile.name || "");
    }
  }, []);

  // Course data- hard coded.
  const [courses] = useState([
    {
      id: 1,
      code: "SER340",
      name: "Software Engineering",
      instructor: "Professor Ruby",
    },
    {
      id: 2,
      code: "CSC310",
      name: "Operating Systems",
      instructor: "Professor Blake",
    },
    {
      id: 3,
      code: "CSC325",
      name: "Database Systems ",
      instructor: "Professor Shah",
    },
    {
      id: 4,
      code: "CSC491",
      name: "Senior Project I",
      instructor: "Professor Jaiswal ",
    },
    {
      id: 5,
      code: "MA301",
      name: "Foundations of Advanced Mathematics",
      instructor: "Professor Shahverdian",
    },
    {
      id: 6,
      code: "PHY122",
      name: "Physics II",
      instructor: "Professor Goodman",
    },
  ]);

  return (
    <div className="dashboard-container">
      {/* Header */}
      <div className="dashboard-header">
        <div className="dashboard-welcome">Welcome {userName}!</div>

        <button
          className="dashboard-profile-btn"
          onClick={() => (window.location.href = "/profile")}
        >
          <span className="dashboard-profile-icon">👤</span>
        </button>
      </div>

      {/* Courses */}
      <div className="dashboard-courses-grid">
        {courses.map((course) => (
          <div
            key={course.id}
            className="dashboard-course-card"
            onClick={() => (window.location.href = "/lessons")}
          >
            <div className="dashboard-course-name">{course.name}</div>
            <div className="dashboard-course-code">{course.code}</div>
            <div className="dashboard-course-instructor">
              {course.instructor}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
