
const mongoose = require("mongoose");
const CitySchema = new mongoose.Schema({
    country_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'countries',
        required: true
    },
    state_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'states',
        required: true
      },
    city_name:String,
    short_name:String,
    is_deleted:  {
        type: Number,
        default: 0
    }
});
module.exports = mongoose.model('cities',CitySchema);