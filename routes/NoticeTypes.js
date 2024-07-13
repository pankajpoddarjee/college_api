var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var NoticeType = require('../models/NoticeType');

/* GET ALL PRODUCTS */
router.get('/', async function(req, res, next) {   debugger;
    try {
        const result = await NoticeType.find({});
        
        res.json({
            records: result
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});


router.post('/',async function(req, res, next) {
    const data = req.body;
    const doc = {
        notice_type_name: data.notice_type_name
    };
    try {
        let notice_type_ins = new NoticeType(doc);
        let result = await notice_type_ins.save();
        if(result){
            res.send({
            success: true,
            message: "Notice type insert successfully",
            users: result
            });
        }else{
            res.send({
            success: false,
            message: "Notice type data not inserted"
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
   
    const result = await NoticeType.findOne({"_id": id});

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
    notice_type_name: data.notice_type_name
};
try {
    const options = { returnDocument: 'after' };
    const result = await NoticeType.findOneAndUpdate({"_id": id},doc, options);

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
    const result = await NoticeType.findOneAndUpdate({"_id": id},doc);

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