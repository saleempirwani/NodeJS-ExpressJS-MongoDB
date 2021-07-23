const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true, 
    },
    rollno: {
        type: String,
        required: true, 
    },
    dept: {
        type: String,
        required: true, 
    },
    gpa: {
        type: String,
        required: true, 
    },
})

module.exports = mongoose.model('Student', studentSchema)