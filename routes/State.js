var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var State = require('../models/State');

/* GET ALL PRODUCTS */
router.get('/', async function(req, res, next) {   
    try { //alert("sdsd");
        // const stateData = await State.find({});

        // res.json({
        //     records: stateData
        // });
        // const stateData = await State.aggregate([
            
        //     {
        //       $lookup: {
        //         from: 'countries',     //collection name
        //         localField: 'country_name',
        //         foreignField: 'country_id',
        //         as: 'countryDetail'       //alias
        //       }
        //     }
        //   ]);
        //   res.json({
        //     records: stateData
        //     });

        // State
        // .find({})
        // .populate('countries.country_id')
        // .exec(function (err, result) {
        //     console.log(JSON.stringify(result));
        // });

        const stateData = await State.find({}).populate('country_id');
        //console.log(stateData);
        res.json({
            records: stateData
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

/* SAVE COLLEGES */
router.post('/',async function(req, res, next) {
    if(req.body.country_id && req.body.state_name && req.body.short_name){
        const data = req.body;
        const doc = {
            country_id: data.country_id, 
            state_name: data.state_name, 
            short_name: data.short_name
        };
        try {
            let state_ins = new State(doc);
            let result = await state_ins.save();
            if(result){
                res.send({
                success: true,
                message: "State insert successfully",
                users: result
                });
            }else{
                res.send({
                success: false,
                message: "State data not inserted"
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

/* GET ALL STATES */
router.get('/all', async function(req, res, next) {   
    try { //alert("sdsd");
        const result = await State.find({});

        res.json({
            records: result
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

router.get('/:id',async(req,res, next)=>{
    //const country_id = req.params.id;
    const id = req.params.id;
    try {
       
        const stateData = await State.findOne({"_id": id}).populate('country_id');
        res.json({
            records: stateData
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

router.get('/getStates/:id',async(req,res, next)=>{
    const country_id = req.params.id;
    try {
       
        const stateData = await State.find({"country_id": country_id});
        res.json({
            records: stateData
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
        state_name: data.state_name, 
        short_name: data.short_name
    };
    try {
        const options = { returnDocument: 'after' };
        const result = await State.findOneAndUpdate({"_id": id},doc, options);
    
        res.json({
            records: result,
            message: "State Updated"
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
            const result = await State.findOneAndUpdate({"_id": id},doc);
    
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