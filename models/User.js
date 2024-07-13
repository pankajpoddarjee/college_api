const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    is_deleted:  {
        type: Number,
        default: 0
    }
});
module.exports = mongoose.model('users',UserSchema);
