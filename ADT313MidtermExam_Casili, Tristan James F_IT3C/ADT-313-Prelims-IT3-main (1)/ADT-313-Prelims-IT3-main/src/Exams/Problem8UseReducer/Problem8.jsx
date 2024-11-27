import React, { useReducer, useState } from 'react';

// Define the action types
const CREATE_ITEM = 'CREATE_ITEM';
const READ_ITEM = 'READ_ITEM';
const EDIT_ITEM = 'EDIT_ITEM';
const DELETE_ITEM = 'DELETE_ITEM';
const CLEAR_FORM = 'CLEAR_FORM';

// Initial state for the reducer
const initialState = {
  items: [], // Array of items
  selectedItem: null, // Currently selected item for editing
};

// Reducer function to handle state changes
const reducer = (state, action) => {
  switch (action.type) {
    case CREATE_ITEM:
      return { ...state, items: state.items.concat(action.payload) }; // Using concat instead of push
    case READ_ITEM:
      return { ...state, selectedItem: action.payload };
    case EDIT_ITEM:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id ? action.payload : item
        ),
        selectedItem: null, // clear the selectedItem after edit
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id),
        selectedItem: null, // clear selected item after delete
      };
    case CLEAR_FORM:
      return { ...state, selectedItem: null };
    default:
      return state;
  }
};

const Problem8 = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [formData, setFormData] = useState({ id: '', name: '' });

  // Handle form changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle Create
  const handleCreate = () => {
    if (!formData.name.trim()) return; // Prevent empty item creation
    const newItem = { id: Date.now(), name: formData.name };
    dispatch({ type: CREATE_ITEM, payload: newItem });
    setFormData({ id: '', name: '' });
  };

  // Handle Read (selecting a row)
  const handleRead = (item) => {
    setFormData({ id: item.id, name: item.name });
    dispatch({ type: READ_ITEM, payload: item });
  };

  // Handle Edit
  const handleEdit = () => {
    if (!formData.name.trim()) return; // Prevent empty edits
    const updatedItem = { id: formData.id, name: formData.name };
    dispatch({ type: EDIT_ITEM, payload: updatedItem });
    setFormData({ id: '', name: '' });
  };

  // Handle Delete
  const handleDelete = (item) => {
    dispatch({ type: DELETE_ITEM, payload: item });
    setFormData({ id: '', name: '' });
  };

  // Handle Clear Form
  const handleClear = () => {
    setFormData({ id: '', name: '' });
    dispatch({ type: CLEAR_FORM });
  };

  return (
    <div>
      <h2>Create/Edit Item</h2>
      <form>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter name"
        />
        <button type="button" onClick={formData.id ? handleEdit : handleCreate}>
          {formData.id ? 'Edit Item' : 'Create Item'}
        </button>
        <button type="button" onClick={handleClear}>Clear Form</button>
      </form>

      <h2>Item List</h2>
      <ul>
        {state.items.map((item) => (
          <li key={item.id}>
            <span onClick={() => handleRead(item)}>{item.name}</span>
            <button onClick={() => handleEdit(item)}>Edit</button>
            <button onClick={() => handleDelete(item)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Problem8;

