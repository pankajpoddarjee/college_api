var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var CollegeTypes = require('../models/CollegeTypes');

/* GET ALL CollegeTypes */
router.get('/', async function(req, res, next) {   
    try { //alert("sdsd");
        const result = await CollegeTypes.find({});

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
    if(req.body.college_type_name){
        const data = req.body;
        const doc = {
            college_type_name: data.college_type_name,
            short_name: data.short_name
        };
        try {
            let CollegeTypes_ins = new CollegeTypes(doc);
            let result = await CollegeTypes_ins.save();
            if(result){
                res.send({
                success: true,
                message: "College types insert successfully",
                users: result
                });
            }else{
                res.send({
                success: false,
                message: "College types data not inserted"
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

router.get('/:id',async(req,res, next)=>{
    const id = req.params.id;
    try {
       
        const result = await CollegeTypes.findOne({"_id": id});
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
        college_type_name: data.college_type_name,
        short_name: data.short_name
    };
    try {
        const options = { returnDocument: 'after' };
        const result = await CollegeTypes.findOneAndUpdate({"_id": id},doc, options);
    
        res.json({
            records: result,
            message: "Record Updated Successfully"
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
            const result = await CollegeTypes.findOneAndUpdate({"_id": id},doc);
    
            res.json({
                records: result,
                message: "Status change successfully"
            });
        } catch(error) {
            console.log(error)
            res.status(400).json(error)
        }
    });

module.exports = router;