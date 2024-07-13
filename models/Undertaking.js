
const mongoose = require("mongoose");
const UndertakingSchema = new mongoose.Schema({
    undertaking_name:String,
    is_deleted:  {
        type: Number,
        default: 0
    }
});
module.exports = mongoose.model('undertakings',UndertakingSchema);