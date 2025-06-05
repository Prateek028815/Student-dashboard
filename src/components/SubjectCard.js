import React from "react";
import "./SubjectCard.css";

const SubjectCard = ({ subject, index, expandedIndex, toggleExpand }) => {
  const isExpanded = expandedIndex === index;
  const progressStyle = {
    width: `${subject.progress}%`,
    backgroundColor: subject.progress < 50 ? "#ff4d4d" : "#4caf50"
  };

  return (
    <div
      className={`subject-card ${subject.progress < 50 ? "low-progress" : ""} ${isExpanded ? "expanded" : ""}`}
      onClick={() => toggleExpand(index)}
      tabIndex={0}
      role="button"
      onKeyPress={(e) => e.key === "Enter" && toggleExpand(index)}
    >
      <h2>{subject.name}</h2>
      <div className="progress-bar">
        <div className="progress-fill" style={progressStyle}>
          {subject.progress}%
        </div>
      </div>

      {subject.progress < 50 && (
        <p className="warning-text">Needs more focus on this subject!</p>
      )}

      {isExpanded && (
        <div className="topics-container">
          <div>
            <h4>📌 Next Topics:</h4>
            <ul>
              {subject.nextTopics.map((topic, i) => (
                <li key={i}>{topic}</li>
              ))}
            </ul>
          </div>
          <div>
            <h4>✅ Completed Topics:</h4>
            <ul>
              {subject.history.map((topic, i) => (
                <li key={i}>{topic}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubjectCard;
