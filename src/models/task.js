const mongoose = require('mongoose')


const Tasks = mongoose.model('Tasks', {

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    }
});

module.exports = Tasks
