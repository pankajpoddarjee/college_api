const mongoose = require("mongoose");



const CourseTypeSchema = new mongoose.Schema({
    course_type_name:String,
    short_name:String,
    is_deleted:  {
        type: Number,
        default: 0
    }
});
module.exports = mongoose.model('coursetypes',CourseTypeSchema);
