import React from 'react';
import PropTypes from 'prop-types'; // Importing PropTypes for type checking

function StudentInformation({ name, section }) {
  return (
    <div className="student-information">
      <h2>Student Information</h2>
      <p>Name: {name || 'N/A'}</p> {/* Fallback if name is undefined */}
      <p>Section: {section || 'N/A'}</p> {/* Fallback if section is undefined */}
    </div>
  );
}

// Adding PropTypes for type checking props passed to the component
StudentInformation.propTypes = {
  name: PropTypes.string,
  section: PropTypes.string,
};

// Default props in case no props are provided
StudentInformation.defaultProps = {
  name: 'Unknown',
  section: 'Unassigned',
};

export default StudentInformation;