import React, { useState } from 'react';

export default function Problem4() {
  const [formData, setFormData] = useState({
    name: '',
    yearlevel: '',
    course: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      <div style={{ display: 'block' }}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </label>
      </div>

      <div style={{ display: 'block' }}>
        <p>Yearlevel:</p>
        <label>
          <input
            type="radio"
            id="firstYear"
            name="yearlevel"
            value="First Year"
            checked={formData.yearlevel === 'First Year'}
            onChange={handleInputChange}
          />
          First Year
        </label>
        <br />
        <label>
          <input
            type="radio"
            id="secondYear"
            name="yearlevel"
            value="Second Year"
            checked={formData.yearlevel === 'Second Year'}
            onChange={handleInputChange}
          />
          Second Year
        </label>
        <br />
        <label>
          <input
            type="radio"
            id="thirdYear"
            name="yearlevel"
            value="Third Year"
            checked={formData.yearlevel === 'Third Year'}
            onChange={handleInputChange}
          />
          Third Year
        </label>
        <br />
        <label>
          <input
            type="radio"
            id="fourthYear"
            name="yearlevel"
            value="Fourth Year"
            checked={formData.yearlevel === 'Fourth Year'}
            onChange={handleInputChange}
          />
          Fourth Year
        </label>
        <br />
        <label>
          <input
            type="radio"
            id="fifthYear"
            name="yearlevel"
            value="Fifth Year"
            checked={formData.yearlevel === 'Fifth Year'}
            onChange={handleInputChange}
          />
          Fifth Year
        </label>
        <br />
        <label>
          <input
            type="radio"
            id="irregular"
            name="yearlevel"
            value="Irregular"
            checked={formData.yearlevel === 'Irregular'}
            onChange={handleInputChange}
          />
          Irregular
        </label>
      </div>

      <div style={{ display: 'block' }}>
        <label>
          Course:
          <select
            name="course"
            value={formData.course}
            onChange={handleInputChange}
          >
            <option value="BSCS">BSCS</option>
            <option value="BSIT">BSIT</option>
            <option value="BSCpE">BSCpE</option>
            <option value="ACT">ACT</option>
          </select>
        </label>
      </div>

      <div style={{ display: 'block', marginTop: '20px' }}>
        <h2>Form Data:</h2>
        <pre>{JSON.stringify(formData, null, 2)}</pre>
      </div>
    </>
  );
}

