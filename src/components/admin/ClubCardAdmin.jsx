import React from 'react';

const ClubCardAdmin = ({ club = {} }) => {
  return (
    <div className="club-card-admin">
      <h4>{club.name || 'Club (admin)'}</h4>
    </div>
  );
};

export default ClubCardAdmin;
