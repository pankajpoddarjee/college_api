var express = require('express');
var router = express.Router();
const multer = require('multer');
const path = require('path');
var mongoose = require('mongoose');
var slugify = require('slugify');
var College = require('../models/College');
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
// router.get('/', async function(req, res, next) {
//     try {
//         const page = parseInt(req.query.page);
//         const size = parseInt(req.query.size);

//         const skip = (page -1) * size;

//         const total = await College.countDocuments();
//         const collegeData = await College.find({}).populate('college_type').populate('undertaking').populate('affiliation').populate('country').populate('state').populate('city').populate('district').populate('course_type').skip(skip).limit(size).sort({ _id: -1 });

//         res.json({
//             records: collegeData,
//             total,
//             page, 
//             size
//         });
//     } catch(error) {
//         console.log(error)
//         res.status(400).json(error)
//     }
// });

//Generate Unique Slug
async function generateUniqueSlug(name,cityName) {
    let slug = slugify(name, { lower: true, strict: true });
    let uniqueSlug = slug+'-'+cityName;
    let count = 1;
  
    while (await College.findOne({ slug: uniqueSlug })) {
      uniqueSlug = `${slug}-${cityName}-${count}`;
      count++;
    }
  
    return uniqueSlug;
  }
/* SAVE COLLEGES */
router.post('/',uploadFields,async function(req, res, next) {
    console.log(req);
    if(req.body.college_name && req.body.address){
        const data = req.body;
        console.log(req.files);
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
            college_name: data.college_name, 
            short_name: data.short_name, 
            college_code: data.college_code, 
            other_name: data.other_name, 
            eshtablish: data.eshtablish, 
            college_type: data.college_type, 
            undertaking: data.undertaking, 
            affiliation: data.affiliation, 
            accreditation: data.accreditation, 
            principal_name: data.principal_name,

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
            
            course_type: data.course_type,
            course: data.course,
            slug : await generateUniqueSlug(data.college_name,cityName)
        };
        //console.log(doc);
        try {
            let college_ins = new College(doc);
            let result = await college_ins.save();
            if(result){
                res.send({
                success: true,
                message: "College insert successfully",
                users: result
                });
            }else{
                res.send({
                success: false,
                message: "College data not inserted"
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

/* GET ALL COLLEGES */
router.get('/all', async function(req, res, next) {   
    try { //alert("sdsd");
        const result = await College.find().populate('college_type').populate('undertaking').populate('affiliation').populate('country').populate('state').populate('city').populate('district').populate('course_type');

        res.json({
            records: result
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

module.exports = router;
/* GET SINGLE COLLEGE BY ID */
router.get('/:id', async function(req, res, next) {
    // College.findById(req.params.id, function (err, post) {
    //   if (err) return next(err);
    //   res.json(post);
    // });

    const id = req.params.id;
    try {
       
        const collegeData = await College.findOne({"_id": id}).populate('college_type').populate('undertaking').populate('affiliation').populate('country').populate('state').populate('city').populate('district').populate('course_type');

        res.json({
            records: collegeData
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

router.put('/:id',uploadFields, async function(req, res, next) {
    // College.findById(req.params.id, function (err, post) {
    //   if (err) return next(err);
    //   res.json(post);
    // });
   // console.log(req.files.banner_img);
    console.log(req.body.course_type);
   

    

    const id = req.params.id;
    const data = req.body;
    console.log(data);
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
            banner_img: banner_img_url,
            logo_img: logo_img_url,
            college_name: data.college_name, 
            short_name: data.short_name, 
            college_code: data.college_code, 
            other_name: data.other_name, 
            eshtablish: data.eshtablish, 
            college_type: data.college_type, 
            undertaking: data.undertaking, 
            affiliation: data.affiliation, 
            accreditation: data.accreditation, 
            principal_name: data.principal_name,

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
            course: data.course,
            course_type: data.course_type
        };
    try {
        const options = { returnDocument: 'after' };
        const collegeData = await College.findOneAndUpdate({"_id": id},doc, options);

        res.json({
            records: collegeData,
            message: "College updated successfully"
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
        const collegeData = await College.findOneAndUpdate({"_id": id},doc);

        res.json({
            records: collegeData,
            message: "Status change  successfully"
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});


