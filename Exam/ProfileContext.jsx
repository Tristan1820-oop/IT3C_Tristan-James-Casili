import React, { useState } from 'react';
import StudentInformation from './components/studentInfo/StudentInformation';
import LoginForm from './components/Login/LoginForm';
import Profile from './components/Profile/Profile';
import MathOperation from './components/MathOperation/MathOperation';
import ProfileContext from './ProfileContext'; // Import your context

function App() {
  const [profile, setProfile] = useState({ name: '', email: '' });
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (userProfile) => {
    setProfile(userProfile);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setProfile({ name: '', email: '' });
    setIsLoggedIn(false);
  };

  return (
    <ProfileContext.Provider value={{ profile }}>
      <div className="app">
        <StudentInformation name="Nathaniel" section="Section A" />
        <LoginForm onLogin={handleLogin} onLogout={handleLogout} />
        {isLoggedIn && <Profile />}
        <MathOperation />
      </div>
    </ProfileContext.Provider>
  );
}

export default App;