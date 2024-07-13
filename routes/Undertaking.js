var express = require('express');
var router = express.Router();
const cors  = require("cors");
var mongoose = require('mongoose');
var Undertaking = require('../models/Undertaking');
router.use(cors());
/* GET ALL PRODUCTS */
router.get('/', async function(req, res, next) {   
    try { //alert("sdsd");
        const result = await Undertaking.find({});

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
    if(req.body.undertaking_name){
        const data = req.body;
        const doc = {
            undertaking_name: data.undertaking_name
        };
        try {
            let undertaking_ins = new Undertaking(doc);
            let result = await undertaking_ins.save();
            if(result){
                res.send({
                success: true,
                message: "Undertaking insert successfully",
                users: result
                });
            }else{
                res.send({
                success: false,
                message: "Undertaking data not inserted"
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
       
        const districtData = await Undertaking.findOne({"_id": id});
        res.json({
            records: districtData
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
        undertaking_name: data.undertaking_name
    };
    try {
        const options = { returnDocument: 'after' };
        const result = await Undertaking.findOneAndUpdate({"_id": id},doc, options);
    
        res.json({
            records: result,
            message: "undertaking Updated"
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
            const result = await Undertaking.findOneAndUpdate({"_id": id},doc);
    
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