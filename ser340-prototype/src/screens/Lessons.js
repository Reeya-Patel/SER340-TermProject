import React, { useState } from "react";

function Lessons() {
  // Mock course data
  const [courseName] = useState("Software Engineering");
  const [currentMonth, setCurrentMonth] = useState(9); // October (0-indexed)
  const [currentYear, setCurrentYear] = useState(2025);
  const [selectedDate, setSelectedDate] = useState(null);

  // Current date (October 25, 2025 for demo - Week 4)
  const today = new Date(2025, 9, 25); // October 25, 2025
  
  // Semester start date (October 1, 2025 = Week 1, Day 1)
  const semesterStartDate = new Date(2025, 9, 1); // October 1, 2025

  // Generate 24 lessons (2 per week for 12 weeks)
  // Week 1 = Lessons 1-2, Week 2 = Lessons 3-4, etc.
  const allLessons = Array.from({ length: 24 }, (_, i) => {
    const lessonNumber = i + 1;
    const weekNum = Math.floor(i / 2) + 1;
    return {
      id: lessonNumber,
      week: weekNum,
      title: `Lesson ${lessonNumber}`,
    };
  });

  // Calculate which week a date belongs to
  const getWeekNumber = (date) => {
    const selectedDateObj = new Date(currentYear, currentMonth, date);
    const daysDiff = Math.floor((selectedDateObj - semesterStartDate) / (1000 * 60 * 60 * 24));
    const weekNumber = Math.floor(daysDiff / 7) + 1;
    return weekNumber >= 1 && weekNumber <= 12 ? weekNumber : null;
  };

  // Get current week number
  const getCurrentWeekNumber = () => {
    const daysDiff = Math.floor((today - semesterStartDate) / (1000 * 60 * 60 * 24));
    const weekNumber = Math.floor(daysDiff / 7) + 1;
    return weekNumber >= 1 && weekNumber <= 12 ? weekNumber : null;
  };

  const currentWeek = getCurrentWeekNumber();

  // Check if a date is in the current week
  const isInCurrentWeek = (day) => {
    if (!day || !currentWeek) return false;
    const dateWeek = getWeekNumber(day);
    return dateWeek === currentWeek;
  };

  // Filter lessons based on selected date
  const displayedLessons = selectedDate 
    ? allLessons.filter(lesson => lesson.week === getWeekNumber(selectedDate))
    : [];

  // Get month name
  const getMonthName = (monthIndex) => {
    const months = [
      "JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE",
      "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"
    ];
    return months[monthIndex];
  };

  // Get days in month
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get first day of month (0 = Sunday, 1 = Monday, etc.)
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Generate calendar days
  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDay = getFirstDayOfMonth(currentMonth, currentYear);
    const days = [];

    // Add empty cells for days before the first day of month
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  // Navigate months
  const previousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Handle date click
  const handleDateClick = (day) => {
    if (day) {
      setSelectedDate(day);
    }
  };

  return (
    <div className="lessons-container">
      {/* Course Name Header */}
      <div className="lessons-course-header">
        <input
          type="text"
          className="lessons-course-input"
          value={courseName}
          readOnly
        />
      </div>

      {/* Main Layout */}
      <div className="lessons-layout">
        {/* Calendar Section */}
        <div className="lessons-calendar">
          {/* Month Navigation */}
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

          {/* Weekday Headers */}
          <div className="lessons-calendar-grid">
            <div className="lessons-weekday">S</div>
            <div className="lessons-weekday">M</div>
            <div className="lessons-weekday">T</div>
            <div className="lessons-weekday">W</div>
            <div className="lessons-weekday">T</div>
            <div className="lessons-weekday">F</div>
            <div className="lessons-weekday">S</div>

            {/* Calendar Days */}
            {calendarDays.map((day, index) => (
              <div
                key={index}
                className={`lessons-calendar-day ${
                  day === selectedDate && currentMonth === 9 && currentYear === 2025
                    ? "selected"
                    : ""
                } ${
                  currentMonth === 9 && currentYear === 2025 && isInCurrentWeek(day)
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

        {/* Lessons List Section */}
        <div className="lessons-list">
          {selectedDate ? (
            displayedLessons.length > 0 ? (
              displayedLessons.map((lesson) => (
                <div key={lesson.id} className="lessons-list-item">
                  <span className="lessons-list-title">{lesson.title}</span>
                  <button className="lessons-feedback-btn">Leave Feedback</button>
                </div>
              ))
            ) : (
              <div className="lessons-empty-state">
                <p>No lessons scheduled for this date.</p>
                <p className="lessons-empty-hint">Select a date within the 12-week semester.</p>
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