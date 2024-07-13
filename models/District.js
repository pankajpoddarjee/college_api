
const mongoose = require("mongoose");
const DistrictSchema = new mongoose.Schema({
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
    district_name:String,
    short_name:String,
    is_deleted:  {
        type: Number,
        default: 0
    }
});
module.exports = mongoose.model('districts',DistrictSchema);