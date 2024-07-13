const mongoose = require("mongoose");
const NoticeTypeSchema = new mongoose.Schema({
    notice_type_name:String,
    is_deleted:  {
        type: Number,
        default: 0
    }
});
module.exports = mongoose.model('notice_types',NoticeTypeSchema);
