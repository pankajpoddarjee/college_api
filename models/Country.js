
const mongoose = require("mongoose");
const CountrySchema = new mongoose.Schema({
    country_name:String,
    short_name:String,
    is_deleted:  {
        type: Number,
        default: 0
    }
});
module.exports = mongoose.model('countries',CountrySchema);