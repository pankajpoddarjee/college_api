const mongoose = require("mongoose");
//const slug = require('mongoose-slug-generator');
//mongoose.plugin(slug);
const CollegeSchema = new mongoose.Schema({
    banner_img: String, 
    logo_img: String,
    college_name: String, 
    short_name: String, 
    college_code: String, 
    other_name: String, 
    eshtablish: String, 
    college_type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'college_types'
    }, 
    undertaking:  {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'undertakings'
    }, 
    affiliation: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'universities'
    }, 
    accreditation: String, 
    principal_name: String,

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
    
    // course_type: {
    //     type: String,
    //     ref: 'coursetypes'
    // }, 
    course_type: String, 
    course: String, 
    is_deleted:  {
        type: Number,
        default: 0
    },    
    slug: { type: String, unique: true }
}, { timestamps: true });
module.exports = mongoose.model('colleges',CollegeSchema);
