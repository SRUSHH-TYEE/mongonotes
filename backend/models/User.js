const mongoose = require('mongoose');
const { Schema } = mongoose;

const indianDate = () => {
    const date = new Date(Date.now());
    const options = { timeZone: 'Asia/Kolkata', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formattedDate = new Intl.DateTimeFormat('en-IN', options).format(date);
    return formattedDate
}

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    date: {
        type: Date,
        default: indianDate
    }
    });

module.exports = mongoose.model('user', UserSchema)
