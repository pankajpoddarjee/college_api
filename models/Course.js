const mongoose = require("mongoose");



const CourseSchema = new mongoose.Schema({
    course_name:String,
    short_name:String,
    is_deleted:  {
        type: Number,
        default: 0
    }
});
module.exports = mongoose.model('courses',CourseSchema);
