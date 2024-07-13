var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Country = require('../models/Country');

/* GET ALL PRODUCTS */
router.get('/', async function(req, res, next) {   
    try { //alert("sdsd");
        const CountryData = await Country.find({});

        res.json({
            records: CountryData
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

/* SAVE COLLEGES */
router.post('/',async function(req, res, next) {
    if(req.body.country_name && req.body.short_name){
        const data = req.body;
        const doc = {
            country_name: data.country_name, 
            short_name: data.short_name
        };
        try {
            let country_ins = new Country(doc);
            let result = await country_ins.save();
            if(result){
                res.send({
                success: true,
                message: "Country insert successfully",
                users: result
                });
            }else{
                res.send({
                success: false,
                message: "Country data not inserted"
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

/* GET ALL COUNTRY */
router.get('/all', async function(req, res, next) {   
    try { //alert("sdsd");
        const result = await Country.find({});

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
       
        const result = await Country.findOne({"_id": id});
    
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
        country_name: data.country_name, 
        short_name: data.short_name
    };
    try {
        const options = { returnDocument: 'after' };
        const result = await Country.findOneAndUpdate({"_id": id},doc, options);
    
        res.json({
            records: result,
            message: "Country Updated"
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
        const result = await Country.findOneAndUpdate({"_id": id},doc);

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