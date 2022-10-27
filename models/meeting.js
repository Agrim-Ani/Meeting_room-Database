const mongoose = require('mongoose')

const meetingSchema = mongoose.Schema({
    userId : {
        type: Number,
        required: true
    },
    name : {
        type: String,
        required: true
    },
    start_time: {
        type: Number
    },
    end_time: {
        type: Number
    },
    time_slot : {
        type: String,
    },
    role: {
        type: String,
        default: "user"
    }
});

module.exports = mongoose.model('meetings',meetingSchema)