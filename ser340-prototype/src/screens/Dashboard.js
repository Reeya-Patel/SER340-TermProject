import React, { useState } from "react";

function Dashboard() {
  // Mock user data - in real app, would come from auth context
  const [userName, setUserName] = useState("John Smith");

  // Course data - would normally come from API based on user email
  const [courses] = useState([
    {
      id: 1,
      code: "SER340",
      name: "Software Engineering",
      instructor: "Dr. Johnson",
    },
    {
      id: 2,
      code: "CS250",
      name: "Data Structures",
      instructor: "Dr. Williams",
    },
    {
      id: 3,
      code: "CS110",
      name: "Introduction to Programming",
      instructor: "Dr. Martinez",
    },
    {
      id: 4,
      code: "MA237",
      name: "Linear Algebra",
      instructor: "Dr. Chen",
    },
    {
      id: 5,
      code: "CS220",
      name: "Computer Organization",
      instructor: "Dr. Brown",
    },
    {
      id: 6,
      code: "EN101",
      name: "English Composition",
      instructor: "Prof. Davis",
    },
  ]);

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <div className="dashboard-header">
        <div className="dashboard-welcome">Welcome ({userName})!</div>
        <button className="dashboard-profile-btn">
          <span className="dashboard-profile-icon">👤</span>
        </button>
      </div>

      {/* Courses Grid */}
      <div className="dashboard-courses-grid">
        {courses.map((course) => (
          <div key={course.id} className="dashboard-course-card">
            <div className="dashboard-course-name">{course.name}</div>
            <div className="dashboard-course-code">{course.code}</div>
            <div className="dashboard-course-instructor">{course.instructor}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
