var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var CourseType = require('../models/CourseType');

/* GET ALL PRODUCTS */
router.get('/', async function(req, res, next) {   debugger;
    try {
        const CourseTypeData = await CourseType.find({});
        
        res.json({
            records: CourseTypeData
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

router.post('/',async function(req, res, next) {
        const data = req.body;
        const doc = {
            course_type_name: data.course_type_name, 
            short_name: data.short_name
        };
        try {
            let course_type_ins = new CourseType(doc);
            let result = await course_type_ins.save();
            if(result){
                res.send({
                success: true,
                message: "Course type insert successfully",
                users: result
                });
            }else{
                res.send({
                success: false,
                message: "Course type data not inserted"
                });
            }
        } catch(error) {
            console.log(error)
            res.status(400).json(error)
        }
});
/* GET SINGLE COLLEGE BY ID */
router.get('/:id', async function(req, res, next) {
    
    const id = req.params.id;
    try {
       
        const result = await CourseType.findOne({"_id": id});

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
        course_type_name: data.course_type_name, 
        short_name: data.short_name
    };
    try {
        const options = { returnDocument: 'after' };
        const result = await CourseType.findOneAndUpdate({"_id": id},doc, options);

        res.json({
            records: result,
            message: "Course Type Updated"
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
        const result = await CourseType.findOneAndUpdate({"_id": id},doc);

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