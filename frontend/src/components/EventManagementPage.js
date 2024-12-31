import React, { useState, useEffect } from 'react';
import axios from 'axios';

const EventManagementPage = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({ name: '', date: '', startTime: '', endTime: '', place: '', club: '', description: '', slots: '' });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('/eventRoute/events');
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleAddEvent = async () => {
    try {
      const response = await axios.post('/eventRoute/events', newEvent);
      setEvents([...events, response.data]);
      setNewEvent({ name: '', date: '', startTime: '', endTime: '', place: '', club: '', description: '', slots: '' });
    } catch (error) {
      console.error('Error adding event:', error);
    }
  };

  const handleEditEvent = async (eventId, updatedEvent) => {
    try {
      await axios.put(`/eventRoute/events/${eventId}`, updatedEvent);
      fetchEvents();
    } catch (error) {
      console.error('Error editing event:', error);
    }
  };

  const handleDeleteEvent = async (eventId) => {
    try {
      await axios.delete(`/eventRoute/events/${eventId}`);
      fetchEvents();
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  return (
    <div>
      <h1>Event Management</h1>
      <div>
        <input type="text" placeholder="Event Name" value={newEvent.name} onChange={e => setNewEvent({ ...newEvent, name: e.target.value })} />
        {/* Add other fields for newEvent */}
        <button onClick={handleAddEvent}>Add Event</button>
        {/* Display event list with options to edit and delete */}
      </div>
    </div>
  );
};

export default EventManagementPage;
