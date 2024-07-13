var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User');
const bcrypt = require('bcrypt');

/* GET ALL PRODUCTS */
router.get('/', async function(req, res, next) {   
    try { 
        const result = await User.find({});
        res.json({
            records: result
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});
router.post('/',async function(req, res, next) {
    if(req.body.name && req.body.email && req.body.password){
        const data = req.body;
        const doc = {
            name: data.name,
            email: data.email,
            password:  await bcrypt.hash(data.password, 10)
        };
        try {
            let user_ins = new User(doc);
            let result = await user_ins.save();
            if(result){
                res.send({
                success: true,
                message: "User insert successfully",
                users: result
                });
            }else{
                res.send({
                success: false,
                message: "User data not inserted"
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
       
        const result = await User.findOne({"_id": id});
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
        name: data.name,
        email: data.email,
        password:  await bcrypt.hash(data.password, 10)
    };
    try {
        const options = { returnDocument: 'after' };
        const result = await User.findOneAndUpdate({"_id": id},doc, options);
    
        res.json({
            records: result,
            message: "User Updated"
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
            const result = await User.findOneAndUpdate({"_id": id},doc);
    
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