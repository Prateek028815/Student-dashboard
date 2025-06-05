import React, { useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import student from "./data/student_data.json";
import SubjectCard from "./components/SubjectCard";
import "./App.css";

function App() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleExpand = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const filteredSubjects = student.subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalSubjects = filteredSubjects.length;
  const totalCompleted = filteredSubjects.reduce((sum, s) => sum + s.history.length, 0);
  const totalPending = filteredSubjects.reduce((sum, s) => sum + s.nextTopics.length, 0);
  const lastUpdated = new Date().toLocaleString();

  const COLORS = ["#4caf50", "#ff9800", "#2196f3", "#9c27b0", "#e91e63", "#795548"];
  const pieData = filteredSubjects.map((subject) => ({
    name: subject.name,
    value: subject.progress
  }));

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">📚 Student Learning Dashboard</h1>

      <div className="search-reset-container">
        <input
          type="text"
          placeholder="Search subjects..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => setSearchTerm("")}>Reset</button>
      </div>

      <div className="summary-boxes">
        <div>📘 Subjects: {totalSubjects}</div>
        <div>✅ Completed: {totalCompleted}</div>
        <div>🕒 Pending: {totalPending}</div>
      </div>

      <div className="next-topics-container">
        <h2>📌 What to Study Next</h2>
        <ul>
          {filteredSubjects.map((subject, i) => (
            <li key={i}>
              <strong>{subject.name}:</strong> {subject.nextTopics[0]}
            </li>
          ))}
        </ul>
      </div>

      <div className="piechart-wrapper">
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend verticalAlign="bottom" height={36} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {filteredSubjects.map((subject, index) => (
        <SubjectCard
          key={index}
          subject={subject}
          index={index}
          expandedIndex={expandedIndex}
          toggleExpand={toggleExpand}
        />
      ))}

      <p className="last-updated">⏰ Last updated on: {lastUpdated}</p>
    </div>
  );
}

export default App;
