
const mongoose = require("mongoose");
var ObjectId = mongoose.Schema.Types.ObjectId;
const StateSchema = new mongoose.Schema({
    country_id: {
        type: ObjectId,
        ref: 'countries',
        required: true
      },
    state_name:String,
    short_name:String,
    is_deleted:  {
      type: Number,
      default: 0
    }
});
module.exports = mongoose.model('states',StateSchema);