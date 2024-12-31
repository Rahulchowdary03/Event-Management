import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskTrackerPage = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ name: '', deadline: '', event: '', assignedAttendee: '', status: 'Pending' });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/eventRoute/tasks/:eventId');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const handleAddTask = async () => {
    try {
      const response = await axios.post('/eventRoute/tasks', newTask);
      setTasks([...tasks, response.data]);
      setNewTask({ name: '', deadline: '', event: '', assignedAttendee: '', status: 'Pending' });
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleUpdateTaskStatus = async (taskId, status) => {
    try {
      await axios.put(`/eventRoute/tasks/${taskId}`, { status });
      fetchTasks();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  return (
    <div>
      <h1>Task Tracker</h1>
      <div>
        <input type="text" placeholder="Task Name" value={newTask.name} onChange={e => setNewTask({ ...newTask, name: e.target.value })} />
        <input type="date" placeholder="Deadline" value={newTask.deadline} onChange={e => setNewTask({ ...newTask, deadline: e.target.value })} />
        <input type="text" placeholder="Event ID" value={newTask.event} onChange={e => setNewTask({ ...newTask, event: e.target.value })} />
        <input type="text" placeholder="Assigned Attendee ID" value={newTask.assignedAttendee} onChange={e => setNewTask({ ...newTask, assignedAttendee: e.target.value })} />
        <button onClick={handleAddTask}>Add Task</button>
        {/* Display task list with options to update status */}
        <ul>
          {tasks.map(task => (
            <li key={task._id}>
              {task.name} ({task.status})
              <button onClick={() => handleUpdateTaskStatus(task._id, 'Completed')}>Mark as Completed</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default TaskTrackerPage;
