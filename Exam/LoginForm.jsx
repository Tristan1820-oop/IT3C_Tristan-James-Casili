import React, { useState, useRef } from 'react';

function LoginForm({ onLogin, onLogout }) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!usernameRef.current.value) {
      setUsernameError('Username is required.');
      return;
    }
    
    if (!passwordRef.current.value) {
      setPasswordError('Password is required.');
      return;
    }
    
    // Simulate successful login
    const userProfile = { name: usernameRef.current.value, email: 'user@example.com' }; // Example profile
    onLogin(userProfile);
    setIsLoggedIn(true);
  };

  const handleLogoutClick = () => {
    onLogout();
    setIsLoggedIn(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">Username:</label>
      <input type="text" id="username" ref={usernameRef} />
      {usernameError && <p>{usernameError}</p>}
      
      <label htmlFor="password">Password:</label>
      <input type="password" id="password" ref={passwordRef} />
      {passwordError && <p>{passwordError}</p>}
      
      <button type="submit">{isLoggedIn ? 'Logout' : 'Login'}</button>
      {isLoggedIn && <button onClick={handleLogoutClick}>Logout</button>}
    </form>
  );
}

export default LoginForm;