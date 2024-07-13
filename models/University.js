const mongoose = require("mongoose");
// const slug = require('mongoose-slug-generator');
// mongoose.plugin(slug);
const UniversitySchema = new mongoose.Schema({
    banner_img: String, 
    logo_img: String,
    university_name: String, 
    short_name: String, 
    university_code: String, 
    other_name: String, 
    eshtablish: String, 
    discription: String, 
    undertaking:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'undertakings'
    }, 
    accreditation: String, 
    chancellor: String,

    address: String, 
    landmark: String, 
    city: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'cities'
    }, 
    district: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'districts'
    }, 
    state: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'states'
    },
    country:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'countries'
    }, 

    email: String, 
    email2: String,
    phone: String,
    website_url: String, 
    website_display: String, 
    is_deleted:  {
        type: Number,
        default: 0
    },   
    slug: { type: String, unique: true }
});
module.exports = mongoose.model('universities',UniversitySchema);
