var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var City = require('../models/City');

/* GET ALL PRODUCTS */
router.get('/', async function(req, res, next) {   
    try { //alert("sdsd");
        // const stateData = await State.find({});

        // res.json({
        //     records: stateData
        // });
        // const sityData = await City.aggregate([
            
        //     {
        //       $lookup: {
        //         from: 'states',     //collection name
        //         localField: 'state_name',
        //         foreignField: 'state_id',
        //         as: 'stateDetail'       //alias
        //       }
        //     }
        //   ]);
        //   res.json({
        //     records: sityData
        //     });
        const cityData = await City.find({}).populate('state_id').populate('country_id');
        res.json({
            records: cityData
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

/* SAVE COLLEGES */
router.post('/',async function(req, res, next) {
    if(req.body.country_id && req.body.state_id && req.body.city_name && req.body.short_name){
        const data = req.body;
        const doc = {
            country_id: data.country_id, 
            state_id: data.state_id, 
            city_name: data.city_name, 
            short_name: data.short_name
        };
        try {
            let city_ins = new City(doc);
            let result = await city_ins.save();
            if(result){
                res.send({
                success: true,
                message: "City insert successfully",
                users: result
                });
            }else{
                res.send({
                success: false,
                message: "City data not inserted"
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
       
        const cityData = await City.findOne({"_id": id}).populate('state_id').populate('country_id');
        res.json({
            records: cityData
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

router.get('/getCities/:id',async(req,res, next)=>{
    const state_id = req.params.id;
    try {
       
        const cityData = await City.find({"state_id": state_id});
        res.json({
            records: cityData
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
        country_id: data.country_id, 
        state_id: data.state_id, 
        city_name: data.city_name, 
        short_name: data.short_name
    };
    try {
        const options = { returnDocument: 'after' };
        const result = await City.findOneAndUpdate({"_id": id},doc, options);
    
        res.json({
            records: result,
            message: "City Updated"
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
            const result = await City.findOneAndUpdate({"_id": id},doc);
    
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