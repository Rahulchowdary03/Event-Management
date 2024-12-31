const express = require("express");
const userSchema = require("../model/userSchema");
const eventSchema = require("../model/eventSchema");
const attendeeSchema = require('../model/attendeeSchema');
const taskSchema = require('../model/taskSchema');
const feedbackSchema = require("../model/feedbackSchema");
const eventRoute = express.Router();
const mongoose = require("mongoose");

// --------------------------------------------------------------------------------
// User
eventRoute.get("/user-list", (req,res) => {
    userSchema.find((err, data) => {
        if(err)
            return err;
        else
            res.json(data);
    })
})
eventRoute.post("/create-user", (req,res) => {
    userSchema.create(req.body, (err,data) => {
        if(err)
            return err;
        else
            res.json(data);
    })
})
eventRoute.route("/check-user/:uname")
.get((req, res) => {
    userSchema.findOne({username: req.params.uname}, (err,data) => {
        if(err)
            return err;
        else
            res.json(data);

    })
})

eventRoute.route("/update-user/:id")
.get((req, res) => {
    userSchema.findById(mongoose.Types.ObjectId(req.params.id), (err,data) => {
        if(err)
            return err;
        else
            res.json(data);
    })
}).put((req, res) => {
    userSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
    {$set:req.body},
    (err,data) => {
        if(err)
            return err;
        else
            res.json(data);
    })
})
eventRoute.delete("/delete-user/:id",(req,res)=>{
    userSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id),
    (err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
})


// -----------------------------------------------------------------------------------------
// Events
eventRoute.get("/event-list", (req,res) => {
    eventSchema.find((err, data) => {
        if(err)
            return err;
        else
            res.json(data);
    })
})

eventRoute.route("/check-event/:id")
.get((req, res) => {
    eventSchema.findById(mongoose.Types.ObjectId(req.params.id), (err,data) => {
        if(err)
            return err;
        else
            res.json(data);
    })
})

eventRoute.post("/create-event", (req,res) => {
    eventSchema.create(req.body, (err,data) => {
        if(err)
            return err;
        else
            res.json(data);
    })
})

eventRoute.route("/update-event/:id")
.get((req, res) => {
    eventSchema.findById(mongoose.Types.ObjectId(req.params.id), (err,data) => {
        if(err)
            return err;
        else
            res.json(data);
    })
}).put((req, res) => {
    eventSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id),
    {$set:req.body},
    (err,data) => {
        if(err)
            return err;
        else
            res.json(data);
    })
})
eventRoute.delete("/delete-event/:id",(req,res)=>{
    eventSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id),
    (err,data)=>{
        if(err)
            return err;
        else
            res.json(data);
    })
})
// Attendee Management 
eventRoute.get('/attendees', (req, res) => { 
    attendeeSchema.find((err, data) => { 
        if (err) res.status(500).send(err); 
        else res.json(data); 
    }); 
}); 
        eventRoute.post('/attendees', (req, res) => { 
            attendeeSchema.create(req.body, (err, data) => { 
                if (err) res.status(500).send(err); else res.json(data); 
            }); 
        });
         eventRoute.delete('/attendees/:id', (req, res) => {
             attendeeSchema.findByIdAndRemove(mongoose.Types.ObjectId(req.params.id), (err, data) => { 
                if (err) res.status(500).send(err); 
                else res.json(data); 
            }); 
        });

        // Task Management 
        eventRoute.get('/tasks/:eventId', (req, res) => { 
            taskSchema.find({ eventId: req.params.eventId }, (err, data) => { 
                if (err) res.status(500).send(err); 
                else res.json(data);
             }); 
            }); 
            eventRoute.post('/tasks', (req, res) => { 
                taskSchema.create(req.body, (err, data) => { 
                    if (err) res.status(500).send(err); 
                    else res.json(data); 
                });
             }); 
             eventRoute.put('/tasks/:id', (req, res) => { 
                taskSchema.findByIdAndUpdate(mongoose.Types.ObjectId(req.params.id), { $set: req.body }, (err, data) => {
                     if (err) res.status(500).send(err); 
                     else res.json(data); 
                    }); 
                });

// Feedback
eventRoute.post("/post-feedback", (req,res) => {
    feedbackSchema.create(req.body, (err,data) => {
        if(err)
            return err;
        else
            res.json(data);
    })
})

module.exports = eventRoute;