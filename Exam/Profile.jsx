import React, { useContext } from 'react';
import ProfileContext from '../../ProfileContext';

function Profile() {
  const { profile } = useContext(ProfileContext);

  return (
    <div className="profile">
      <h2>Profile</h2>
      <p>Name: {profile.name}</p>
      <p>Email: {profile.email}</p>
      {/* Other profile details */}
    </div>
  );
}

export default Profile;