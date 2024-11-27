import React from 'react';

const Problem1Component = ({ studentName, course, section }) => {
  return (
    <div>
      <h2>Student Information</h2>
      <p><strong>Name:</strong> {studentName}</p>
      <p><strong>Course:</strong> {course}</p>
      <p><strong>Section:</strong> {section}</p>
    </div>
  );
};

export default Problem1Component;
