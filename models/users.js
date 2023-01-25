const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
username:String,
required:Boolean,
unique:Boolean,
timestamp:Boolean

})

const User = mongoose.model('User', userSchema);

module.exports = User;