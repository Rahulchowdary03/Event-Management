const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    deadline: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['Pending', 'Completed'],
        default: 'Pending'
    },
    event: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Event',
        required: true
    },
    assignedAttendee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendee'
    }
}, {
    collection: "tasks-record",
    timestamps: true
});

module.exports = mongoose.model("Task", taskSchema);
