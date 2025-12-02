// Lessons.js
// Shows calendar + lessons for one course and links to feedback screen.

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Lessons() {
  const location = useLocation();
  const navigate = useNavigate();

  // course name – use value from Dashboard if it was passed, otherwise default
  const [courseName] = useState(
    location.state?.courseName || "Software Engineering"
  );

  // 🔹 role from profile (Student / Professor)
  const [role, setRole] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      try {
        const profile = JSON.parse(stored);
        setRole(profile.role || null);
      } catch (e) {
        setRole(null);
      }
    }
  }, []);

  // calendar state
  const [currentMonth, setCurrentMonth] = useState(9); // October (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState(null);

  // current date for highlighting current week (October 25, 2025)
  const today = new Date(2025, 9, 25);

  // semester start date (October 1, 2025 = Week 1)
  const semesterStartDate = new Date(2025, 9, 1);

  // create 24 lessons (2 per week for 12 weeks)
  const allLessons = Array.from({ length: 24 }, (_, i) => {
    const lessonNumber = i + 1;
    const weekNum = Math.floor(i / 2) + 1;
    return {
      id: lessonNumber,
      week: weekNum,
      title: `Lesson ${lessonNumber}`,
    };
  });

  // helper: find which week a date belongs to (1–12)
  const getWeekNumber = (date) => {
    const selectedDateObj = new Date(currentYear, currentMonth, date);
    const daysDiff =
      (selectedDateObj - semesterStartDate) / (1000 * 60 * 60 * 24);
    const weekNumber = Math.floor(daysDiff / 7) + 1;
    return weekNumber >= 1 && weekNumber <= 12 ? weekNumber : null;
  };

  // helper: get current week number based on "today"
  const getCurrentWeekNumber = () => {
    const daysDiff = (today - semesterStartDate) / (1000 * 60 * 60 * 24);
    const weekNumber = Math.floor(daysDiff / 7) + 1;
    return weekNumber >= 1 && weekNumber <= 12 ? weekNumber : null;
  };

  const currentWeek = getCurrentWeekNumber();

  // check if given day is part of the current week
  const isInCurrentWeek = (day) => {
    if (!day || !currentWeek) return false;
    const dateWeek = getWeekNumber(day);
    return dateWeek === currentWeek;
  };

  // lessons list for selected date (based on week)
  const displayedLessons = selectedDate
    ? allLessons.filter((lesson) => lesson.week === getWeekNumber(selectedDate))
    : [];

  // month name helper
  const getMonthName = (monthIndex) => {
    const months = [
      "JANUARY",
      "FEBRUARY",
      "MARCH",
      "APRIL",
      "MAY",
      "JUNE",
      "JULY",
      "AUGUST",
      "SEPTEMBER",
      "OCTOBER",
      "NOVEMBER",
      "DECEMBER",
    ];
    return months[monthIndex];
  };

  // days in month helper
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // first day of month (0 = Sunday)
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // build calendar grid (nulls at start for offset)
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // previous month arrow
  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // next month arrow
  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // when a day is clicked
  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(day);
    }
  };

  // when user clicks "Leave Feedback" (student)
  const handleLeaveFeedback = (lesson) => {
    navigate("/feedback", {
      state: {
        courseName,
        lessonTitle: lesson.title,
        selectedDate,
      },
    });
  };

  // when professor clicks "View Feedback"
  const handleViewFeedback = (lesson) => {
    navigate("/professor", {
      state: {
        courseName,
        lessonTitle: lesson.title,
        selectedDate,
      },
    });
  };

  // back button to dashboard
  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="lessons-container">
      {/* course header + back button */}
      <div className="lessons-course-header">
        <button
          type="button"
          onClick={handleBackToDashboard}
          style={{
            marginBottom: "0.75rem",
            padding: "0.35rem 0.9rem",
            borderRadius: "6px",
            border: "1px solid #002b5c",
            background: "white",
            color: "#002b5c",
            cursor: "pointer",
            fontSize: "0.9rem",
            marginRight: "0.75rem",
          }}
        >
          ← Back to courses
        </button>

        <input
          type="text"
          className="lessons-course-input"
          value={courseName}
          readOnly
        />
      </div>

      {/* main layout: calendar on left, lessons list on right */}
      <div className="lessons-layout">
        {/* calendar box */}
        <div className="lessons-calendar">
          <div className="lessons-calendar-header">
            <button className="lessons-month-nav" onClick={previousMonth}>
              &lt;
            </button>
            <span className="lessons-month-title">
              {getMonthName(currentMonth)} {currentYear}
            </span>
            <button className="lessons-month-nav" onClick={nextMonth}>
              &gt;
            </button>
          </div>

          {/* weekday headers */}
          <div className="lessons-calendar-grid">
            <div className="lessons-weekday">S</div>
            <div className="lessons-weekday">M</div>
            <div className="lessons-weekday">T</div>
            <div className="lessons-weekday">W</div>
            <div className="lessons-weekday">T</div>
            <div className="lessons-weekday">F</div>
            <div className="lessons-weekday">S</div>

            {/* calendar days */}
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`lessons-calendar-day ${
                  // highlight selected date
                  day === selectedDate &&
                  currentMonth === 9 &&
                  currentYear === 2025
                    ? "selected"
                    : ""
                } ${
                  // highlight current week
                  currentMonth === 9 &&
                  currentYear === 2025 &&
                  isInCurrentWeek(day)
                    ? "current-week"
                    : ""
                } ${day === null ? "empty" : ""}`}
                onClick={() => handleDateClick(day)}
              >
                {day}
              </div>
            ))}
          </div>
        </div>

        {/* lessons list for selected date */}
        <div className="lessons-list">
          {selectedDate ? (
            displayedLessons.length > 0 ? (
              displayedLessons.map((lesson) => (
                <div key={lesson.id} className="lessons-list-item">
                  <span className="lessons-list-title">{lesson.title}</span>

                  {/* 🔹 Button varies by role */}
                  {role === "Student" && (
                    <button
                      className="lessons-feedback-btn"
                      onClick={() => handleLeaveFeedback(lesson)}
                    >
                      Leave Feedback
                    </button>
                  )}

                  {role === "Professor" && (
                    <button
                      className="lessons-feedback-btn"
                      onClick={() => handleViewFeedback(lesson)}
                    >
                      View Feedback
                    </button>
                  )}
                </div>
              ))
            ) : (
              <div className="lessons-empty-state">
                <p>No lessons scheduled for this date.</p>
                <p className="lessons-empty-hint">
                  Select a date within the 12-week semester.
                </p>
              </div>
            )
          ) : (
            <div className="lessons-empty-state">
              <p>Click on a date to view lessons for that week.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Lessons;
