import React, { useState } from 'react';

function Problem2() {
  const [isProfileVisible, setIsProfileVisible] = useState(false); // State to track visibility

  const user = {
    name: 'Hedy Lamarr',
    imageUrl: 'https://i.imgur.com/yXOvdOSs.jpg',
    imageSize: 90,
  };

  // Function to toggle the profile visibility
  const toggleProfile = () => {
    setIsProfileVisible(prevState => !prevState); // Toggle the visibility state
  };

  function Profile() {
    return (
      <>
        <h1>{user.name}</h1>
        <img
          className='avatar'
          src={user.imageUrl}
          alt={'Photo of ' + user.name}
          style={{
            width: user.imageSize,
            height: user.imageSize,
          }}
        />
      </>
    );
  }

  function InitialContent() {
    return <h1>User profile is hidden.</h1>;
  }

  return (
    <>
      <div>
        {isProfileVisible ? <Profile /> : <InitialContent />} {/* Conditionally render content */}
        <button type="button" onClick={toggleProfile}>
          {isProfileVisible ? 'Hide Profile' : 'Show Profile'}
        </button>
      </div>
    </>
  );
}

export default Problem2;

