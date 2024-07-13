

const mongoose = require("mongoose");
const NoticeSchema = new mongoose.Schema({
    college_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'colleges'
    },
    course_type_id:String,
    course_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coursetypes'
    },
    notice_type_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'notice_types'
    },
    notice_date: String,
    notice_title: String,
    full_url_link: String,
    active_status: String,
    new_tag: String,
    publish_lu: String,
    is_deleted:  {
        type: Number,
        default: 0
    }
});
module.exports = mongoose.model('college_notices',NoticeSchema);

