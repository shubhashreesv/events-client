import React from 'react';

const EventCard = ({ event = {} }) => {
  return (
    <div className="event-card">
      <h3>{event.title || 'Event Title'}</h3>
      <p>{event.description || 'Event description'}</p>
    </div>
  );
};

export default EventCard;
