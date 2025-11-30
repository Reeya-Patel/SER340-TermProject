import React, { useState } from "react";

function ProfessorFeedback() {
  const [selectedQuestion, setSelectedQuestion] = useState("Q1");

  // dummy summary values – you can replace with real data later
  const summary = {
    responses: 18,
    comprehension: "4.2 / 5",
    pace: "Just Right",
  };

  const responsesByQuestion = {
    Q1: [
      "The examples helped me understand the concept.",
      "Some parts felt rushed, but overall it was clear.",
    ],
    Q2: [
      "The pace was just right.",
      "I would have liked a bit more time on the last topic.",
    ],
    Q3: [
      "More practice problems would help.",
      "Maybe add a quick recap at the end of class.",
    ],
  };

  const responses = responsesByQuestion[selectedQuestion];

  return (
    <div className="login-container">
      <div className="login-card prof-card">
        {/* Course header */}
        <h1 className="prof-title">Course Name</h1>
        <p className="prof-subtitle">Course Code</p>
        <hr className="prof-divider" />

        <div className="prof-layout">
          {/* LEFT: summary panel */}
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

          {/* RIGHT: question tabs + responses */}
          <div className="prof-detail">
            <div className="prof-tabs">
              {["Q1", "Q2", "Q3"].map((q) => (
                <button
                  key={q}
                  type="button"
                  className={
                    "prof-tab-btn" +
                    (selectedQuestion === q ? " prof-tab-btn-active" : "")
                  }
                  onClick={() => setSelectedQuestion(q)}
                >
                  {q}
                </button>
              ))}
            </div>

            <div className="prof-responses-box">
              {responses && responses.length > 0 ? (
                <ul className="prof-responses-list">
                  {responses.map((text, index) => (
                    <li key={index}>{text}</li>
                  ))}
                </ul>
              ) : (
                <p className="prof-no-responses">
                  No responses recorded for this question yet.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfessorFeedback;
