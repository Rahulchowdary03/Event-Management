const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /([01]\d|2[0-3]):([0-5]\d)/.test(v); // HH:MM format
            },
            message: props => `${props.value} is not a valid start time!`
        }
    },
    endTime: {
        type: String,
        required: true,
        validate: {
            validator: function (v) {
                return /([01]\d|2[0-3]):([0-5]\d)/.test(v); // HH:MM format
            },
            message: props => `${props.value} is not a valid end time!`
        }
    },
    place: {
        type: String,
        required: true
    },
    club: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: "No description provided"
    },
    slots: {
        type: Number,
        required: true,
        min: [1, 'Must be at least 1 slot']
    },
    registeredUsers: {
        type: [String],
        default: []
    },
    tasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task'
    }],
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Attendee'
    }]
}, {
    collection: "events-record",
    timestamps: true
});

module.exports = mongoose.model("Event", eventSchema);
