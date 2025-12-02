import React from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";

import Login from "./screens/Login";
import Dashboard from "./screens/Dashboard";
import Lessons from "./screens/Lessons";
import StudentFeedback from "./screens/StudentFeedback";
import ProfessorFeedback from "./screens/ProfessorFeedback";
import Profile from "./screens/Profile";
import PasswordReset from "./screens/PasswordReset";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/reset" element={<PasswordReset />} />

      {/* Student routes */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/lessons" element={<Lessons />} />
      <Route path="/feedback" element={<StudentFeedback />} />

      {/* Professor route */}
      <Route path="/professor" element={<ProfessorFeedback />} />

      {/* fallback */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
