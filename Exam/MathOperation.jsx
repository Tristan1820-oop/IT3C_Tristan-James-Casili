import React, { useReducer, useState } from 'react';

function MathOperation() {
  // Initial state of the reducer
  const initialState = {
    result: 0,
  };

  // Reducer function to handle different math operations
  const reducer = (state, action) => {
    switch (action.type) {
      case 'ADD':
        return { result: state.result + action.payload };
      case 'SUBTRACT':
        return { result: state.result - action.payload };
      case 'MULTIPLY':
        return { result: state.result * action.payload };
      case 'DIVIDE':
        // Prevent division by zero
        if (action.payload === 0) {
          alert('Cannot divide by zero');
          return state;
        }
        return { result: state.result / action.payload };
      default:
        return state;
    }
  };

  // Using useReducer to manage state with the defined reducer
  const [state, dispatch] = useReducer(reducer, initialState);
  const [inputValue, setInputValue] = useState(0); // State for user input

  // Handle input changes
  const handleChange = (e) => {
    setInputValue(Number(e.target.value));
  };

  return (
    <div className="math-operation">
      <h2>Math Operation</h2>
      <input
        type="number"
        value={inputValue}
        onChange={handleChange}
        placeholder="Enter a number"
      />
      <div>
        <button onClick={() => dispatch({ type: 'ADD', payload: inputValue })}>
          Add
        </button>
        <button onClick={() => dispatch({ type: 'SUBTRACT', payload: inputValue })}>
          Subtract
        </button>
        <button onClick={() => dispatch({ type: 'MULTIPLY', payload: inputValue })}>
          Multiply
        </button>
        <button onClick={() => dispatch({ type: 'DIVIDE', payload: inputValue })}>
          Divide
        </button>
      </div>
      <p>Result: {state.result}</p>
    </div>
  );
}

export default MathOperation;