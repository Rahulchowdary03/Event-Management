import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AttendeeManagementPage = () => {
  const [attendees, setAttendees] = useState([]);
  const [newAttendee, setNewAttendee] = useState({ name: '', email: '', event: '' });

  useEffect(() => {
    fetchAttendees();
  }, []);

  const fetchAttendees = async () => {
    try {
      const response = await axios.get('/eventRoute/attendees');
      setAttendees(response.data);
    } catch (error) {
      console.error('Error fetching attendees:', error);
    }
  };

  const handleAddAttendee = async () => {
    try {
      const response = await axios.post('/eventRoute/attendees', newAttendee);
      setAttendees([...attendees, response.data]);
      setNewAttendee({ name: '', email: '', event: '' });
    } catch (error) {
      console.error('Error adding attendee:', error);
    }
  };

  const handleRemoveAttendee = async (attendeeId) => {
    try {
      await axios.delete(`/eventRoute/attendees/${attendeeId}`);
      fetchAttendees();
    } catch (error) {
      console.error('Error removing attendee:', error);
    }
  };

  return (
    <div>
      <h1>Attendee Management</h1>
      <div>
        <input type="text" placeholder="Name" value={newAttendee.name} onChange={e => setNewAttendee({ ...newAttendee, name: e.target.value })} />
        <input type="email" placeholder="Email" value={newAttendee.email} onChange={e => setNewAttendee({ ...newAttendee, email: e.target.value })} />
        <input type="text" placeholder="Event ID" value={newAttendee.event} onChange={e => setNewAttendee({ ...newAttendee, event: e.target.value })} />
        <button onClick={handleAddAttendee}>Add Attendee</button>
        {/* Display attendee list with options to remove */}
        <ul>
          {attendees.map(attendee => (
            <li key={attendee._id}>
              {attendee.name} ({attendee.email})
              <button onClick={() => handleRemoveAttendee(attendee._id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AttendeeManagementPage;
