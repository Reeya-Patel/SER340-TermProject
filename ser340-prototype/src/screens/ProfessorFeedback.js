import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfessorFeedback() {
  const navigate = useNavigate();

  // summary stays the same (left column)
  const summary = {
    responses: 18,
    comprehension: "4.2 / 5",
    pace: "Just Right",
  };

  // RIGHT SIDE: All feedback comments (no tabs)
  const allFeedback = [
    "The examples helped me understand the concept.",
    "Some parts felt rushed, but overall it was clear.",
    "The pace was just right.",
    "I would have liked a bit more time on the last topic.",
    "More practice problems would help.",
    "Maybe add a quick recap at the end of class.",
  ];

  return (
    <div className="login-container">
      <div className="login-card prof-card">
        {/* back button */}
        <button
          type="button"
          className="feedback-back-btn"
          onClick={() => navigate(-1)}
        >
          ← Back to course
        </button>

        {/* header */}
        <h1 className="prof-title">Course Name</h1>
        <p className="prof-subtitle">Course Code</p>
        <hr className="prof-divider" />

        <div className="prof-layout">
          {/* LEFT SIDE — summary box stays the same */}
          <div className="prof-summary">
            <h2 className="prof-summary-title">Summary</h2>

            <div className="prof-summary-row">
              <span># Responses</span>
              <span className="prof-summary-value">{summary.responses}</span>
            </div>

            <div className="prof-summary-row">
              <span>Comprehension</span>
              <span className="prof-summary-value">
                {summary.comprehension}
              </span>
            </div>

            <div className="prof-summary-row">
              <span>Pace</span>
              <span className="prof-summary-value">{summary.pace}</span>
            </div>
          </div>

          {/* RIGHT SIDE — ONLY FEEDBACK COMMENTS */}
          <div className="prof-detail">
            <h2 className="prof-summary-title">Feedback Comments</h2>

            <div className="prof-responses-box">
              {allFeedback.length > 0 ? (
                <ul className="prof-responses-list">
                  {allFeedback.map((text, index) => (
                    <li key={index}>{text}</li>
                  ))}
                </ul>
              ) : (
                <p className="prof-no-responses">No feedback comments yet.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessorFeedback;
