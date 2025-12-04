import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function StudentFeedback() {
  //variables for screen.
  const [understanding, setUnderstanding] = useState("None");
  const [pace, setPace] = useState("");
  const [improvement, setImprovement] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="login-container">
      <div className="login-card feedback-card">
        {/*  back button */}
        <button
          type="button"
          className="feedback-back-btn"
          onClick={() => navigate(-1)} // go to last page (not login)
        >
          ← Back to course
        </button>

        {/* screen header info */}
        <h1 className="feedback-title">Course Name</h1>
        <p className="feedback-subtitle">Course Code</p>
        <hr className="feedback-divider" />

        <form onSubmit={handleSubmit} className="feedback-form">
          {/* Question 1- understanding */}
          <div className="feedback-group">
            <label className="feedback-label">
              Was the lesson easy to understand?
            </label>
            <select
              className="feedback-select"
              value={understanding}
              onChange={(e) => setUnderstanding(e.target.value)}
            >
              {/* options for users to select from- drop down. */}
              <option value="None">None</option>
              <option value="Very easy">Very easy</option>
              <option value="Somewhat easy">Somewhat easy</option>
              <option value="Hard to follow">Hard to follow</option>
            </select>
          </div>

          {/* Question 2- pace */}
          <div className="feedback-group">
            <label className="feedback-label">
              Was the lesson&apos;s pace appropriate?
            </label>

            <div className="feedback-radio-row">
              {/* radio button for too fast pace */}
              <label className="feedback-radio">
                <input
                  type="radio"
                  name="pace"
                  value="Too Fast"
                  checked={pace === "Too Fast"}
                  onChange={(e) => setPace(e.target.value)}
                />
                <span>Too Fast</span>
              </label>

              {/* radio button for just right pace */}
              <label className="feedback-radio">
                <input
                  type="radio"
                  name="pace"
                  value="Just Right"
                  checked={pace === "Just Right"}
                  onChange={(e) => setPace(e.target.value)}
                />
                <span>Just Right</span>
              </label>

              {/* radio button for too slow pace */}
              <label className="feedback-radio">
                <input
                  type="radio"
                  name="pace"
                  value="Too Slow"
                  checked={pace === "Too Slow"}
                  onChange={(e) => setPace(e.target.value)}
                />
                <span>Too Slow</span>
              </label>
            </div>
          </div>

          {/* Question 3- improvement comments */}
          <div className="feedback-group">
            <label className="feedback-label">
              How can the lesson be improved?
            </label>
            {/* open ended area for users to input comments  */}
            <textarea
              className="feedback-textarea"
              rows={4}
              value={improvement}
              onChange={(e) => setImprovement(e.target.value)}
            />
          </div>

          {/* feedback submission button */}
          <div className="feedback-submit-row">
            <button type="submit" className="feedback-submit-btn">
              Submit feedback
            </button>
          </div>

          {/* When submitted, confirm popup occurs. */}
          {submitted && (
            <p className="feedback-confirm">
              Thank you! Your feedback has been recorded for this lesson.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default StudentFeedback;
