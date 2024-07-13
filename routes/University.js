var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
var mongoose = require('mongoose');
var slugify = require('slugify');
var University = require('../models/University');
var City = require('../models/City');


router.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads');
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname
    );
  },
});
const filefilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({ storage: storage, filefilter: filefilter });

  const uploadFields = upload.fields([
    { name: 'banner_img', maxCount: 1 },
    { name: 'logo_img', maxCount: 1 },
  ]);
/* GET ALL COLLEGES */
router.get('/', async function(req, res, next) {
    try {
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);

        const skip = (page -1) * size;

        const total = await University.countDocuments();
        const result = await University.find().skip(skip).limit(size);

        res.json({
            records: result,
            total,
            page, 
            size
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});


//Generate Unique Slug
async function generateUniqueSlug(name,cityName) {
    let slug = slugify(name, { lower: true, strict: true });
    let uniqueSlug = slug+'-'+cityName;
    let count = 1;
  
    while (await University.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${cityName}-${count}`;
      count++;
    }
  
    return uniqueSlug;
  }

/* SAVE University */
router.post('/',uploadFields, async function(req, res, next) {
    if(req.body.university_name && req.body.address){
        console.log(req.files);
        const data = req.body;
        var banner_img_url = '';
        if(req.files && req.files.banner_img ){
            var banner_img_detail = req.files.banner_img.map(a => a.filename);
            var banner_img_name = banner_img_detail[0];
            var banner_img_url = req.protocol + '://' + req.get('host') + '/uploads/' +banner_img_name;
        }

        var logo_img_url = '';
        if(req.files && req.files.logo_img ){
            var logo_img_detail = req.files.logo_img.map(a => a.filename);
        var logo_img_name = logo_img_detail[0];
            var logo_img_url = req.protocol + '://' + req.get('host') + '/uploads/' + logo_img_name;
        }

        const cityData = await City.findOne({"_id": data.city});
        const cityName = cityData.city_name;
        const doc = {
            banner_img:banner_img_url,
            logo_img:logo_img_url,
            university_name: data.university_name, 
            short_name: data.short_name, 
            university_code: data.university_code, 
            other_name: data.other_name, 
            eshtablish: data.eshtablish, 
            discription: data.discription,
            university_type: data.university_type, 
            undertaking: data.undertaking, 
            accreditation: data.accreditation, 
            chancellor: data.chancellor,

            address: data.address, 
            landmark: data.landmark, 
            city: data.city, 
            district: data.district, 
            state: data.state, 
            country: data.country, 

            email: data.email, 
            email2: data.email2,
            phone: data.phone,
            website_url: data.website_url, 
            website_display: data.website_display,
            slug : await generateUniqueSlug(data.university_name,cityName)
        };
        try {
            let university_ins = new University(doc);
            let result = await university_ins.save();
            if(result){
                res.send({
                success: true,
                message: "University insert successfully",
                users: result
                });
            }else{
                res.send({
                success: false,
                message: "University data not inserted"
                });
            }
        } catch(error) {
            console.log(error)
            res.status(400).json(error)
        }
    }else{
        res.send({
            success: false,
            message: "Please input required field"
        });
    }
});
/* GET ALL UNIVERSITY */
router.get('/all', async function(req, res, next) {   
    try { //alert("sdsd");
        const result = await University.find({});

        res.json({
            records: result
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});
/* GET SINGLE COLLEGE BY ID */
router.get('/:id', async function(req, res, next) {
    
    const id = req.params.id;
    try {
       
        const result = await University.findOne({"_id": id}).populate('undertaking').populate('country').populate('state').populate('city').populate('district');

        res.json({
            records: result
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

router.put('/:id',uploadFields, async function(req, res, next) {
    
    const id = req.params.id;
    const data = req.body;
    var banner_img_url = data.banner_img_previous;
    if(req.files && req.files.banner_img ){
        var banner_img_detail = req.files.banner_img.map(a => a.filename);
        var banner_img_name = banner_img_detail[0];
        var banner_img_url = req.protocol + '://' + req.get('host') + '/uploads/' +banner_img_name;
    }

    var logo_img_url = data.logo_img_previous;
    if(req.files && req.files.logo_img ){
        var logo_img_detail = req.files.logo_img.map(a => a.filename);
    var logo_img_name = logo_img_detail[0];
        var logo_img_url = req.protocol + '://' + req.get('host') + '/uploads/' + logo_img_name;
    }
    const doc = {
        banner_img:banner_img_url,
        logo_img:logo_img_url,
        university_name: data.university_name, 
        short_name: data.short_name, 
        university_code: data.university_code, 
        other_name: data.other_name, 
        eshtablish: data.eshtablish, 
        discription: data.discription, 
        university_type: data.university_type, 
        undertaking: data.undertaking, 
        accreditation: data.accreditation, 
        chancellor: data.chancellor,

        address: data.address, 
        landmark: data.landmark, 
        city: data.city, 
        district: data.district, 
        state: data.state, 
        country: data.country, 

        email: data.email, 
        email2: data.email2,
        phone: data.phone,
        website_url: data.website_url, 
        website_display: data.website_display
    };
    try {
        const options = { returnDocument: 'after' };
        const result = await University.findOneAndUpdate({"_id": id},doc, options);

        res.json({
            records: result,
            message: "University updated successfully"
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

router.delete('/:id/:status', async function(req, res, next) {
    const id = req.params.id;
    const status = req.params.status;
        const doc = {
            is_deleted: status
        };
    try {
        const options = { returnDocument: 'after' };
        const result = await University.findOneAndUpdate({"_id": id},doc);

        res.json({
            records: result,
             message: "Status change  successfully"
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});
module.exports = router;