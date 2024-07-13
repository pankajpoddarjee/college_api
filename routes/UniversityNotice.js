var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var UniversityNotice = require('../models/UniversityNotice');

/* GET ALL PRODUCTS */
router.get('/', async function(req, res, next) {   
    try { //alert("sdsd");
        const result = await UniversityNotice.find({}).populate('notice_type_id').populate('university_id').populate('course_type_id');

        res.json({
            records: result
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

/* SAVE COLLEGES */
router.post('/',async function(req, res, next) {
    //console.log(req);
  //  if(req.body.college_name && req.body.course_type){
        const data = req.body;
        const doc = {
            university_id: data.university_name, 
            course_type_id: data.course_type, 
            notice_type_id: data.notice_type, 
            notice_date: data.notice_date, 
            notice_title: data.notice_title, 
            full_url_link: data.full_url_link,  
            active_status: data.active_status,  
            new_tag: data.new_tag

            
        };
        try {
            let notice_ins = new UniversityNotice(doc);
            let result = await notice_ins.save();
            if(result){
                res.send({
                success: true,
                message: "Notice insert successfully",
                users: result
                });
            }else{
                res.send({
                success: false,
                message: "Notice data not inserted"
                });
            }
        } catch(error) {
            console.log(error)
            res.status(400).json(error)
        }
    // }else{
    //     res.send({
    //         success: false,
    //         message: "Please input required field"
    //     });
    //}
});
/* GET SINGLE COLLEGE BY ID */
router.get('/:id', async function(req, res, next) {
    
    const id = req.params.id;
    try {
       
        const result = await UniversityNotice.findOne({"_id": id}).populate('notice_type_id').populate('university_id').populate('course_type_id');

        res.json({
            records: result
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});
router.put('/:id', async function(req, res, next) {
    
    const id = req.params.id;
    const data = req.body;
    const doc = {
        college_id: data.college_name, 
        course_type_id: data.course_type, 
        notice_type_id: data.notice_type, 
        notice_date: data.notice_date, 
        notice_title: data.notice_title, 
        full_url_link: data.full_url_link,  
        active_status: data.active_status,  
        new_tag: data.new_tag
        
    };
    try {
        const options = { returnDocument: 'after' };
        const result = await UniversityNotice.findOneAndUpdate({"_id": id},doc, options);

        res.json({
            records: result,
            message: "Notice Updated"
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
        const result = await UniversityNotice.findOneAndUpdate({"_id": id},doc);

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