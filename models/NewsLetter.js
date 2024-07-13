
const mongoose = require("mongoose");
const NewsLetterSchema = new mongoose.Schema({
    email:{ type: String, unique: true },
    is_verified:  {
        type: Number,
        default: 0
    },
    is_deleted:  {
        type: Number,
        default: 0
    }
}, { timestamps: true });
module.exports = mongoose.model('news_letters',NewsLetterSchema);