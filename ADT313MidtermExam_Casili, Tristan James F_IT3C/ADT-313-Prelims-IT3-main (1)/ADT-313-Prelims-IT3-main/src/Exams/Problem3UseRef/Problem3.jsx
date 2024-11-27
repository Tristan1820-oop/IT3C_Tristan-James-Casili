import React, { useRef } from 'react';

function Problem3() {
  // Create an array of refs for all the input fields
  const inputRefs = Array.from({ length: 10 }, () => useRef(null));

  const handleFocusEmptyInput = () => {
    // Loop through the refs and focus on the first empty input
    for (let i = 0; i < inputRefs.length; i++) {
      if (!inputRefs[i].current.value) {
        inputRefs[i].current.focus();
        break; // Focus on the first empty input and stop
      }
    }
  };

  return (
    <>
      {/* Render the 10 input fields with refs */}
      {Array.from({ length: 10 }).map((_, index) => (
        <div style={{ display: 'block' }} key={index}>
          Input {index + 1}: 
          <input type='text' ref={inputRefs[index]} />
        </div>
      ))}
      
      <button type='button' onClick={handleFocusEmptyInput}>
        I'm a button
      </button>
    </>
  );
}

export default Problem3;
