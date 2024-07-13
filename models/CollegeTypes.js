
const mongoose = require("mongoose");
const CollegeTypesSchema = new mongoose.Schema({
    college_type_name:String,
    short_name:String,
    is_deleted:  {
        type: Number,
        default: 0
    }
});
module.exports = mongoose.model('college_types',CollegeTypesSchema);