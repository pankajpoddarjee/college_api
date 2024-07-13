//const http  = require("http");
const express = require("express");
const cors  = require("cors");
const jwt = require("jsonwebtoken");
const path = require('path');
const bcrypt = require('bcrypt');
require('dotenv').config();



const PORT = process.env.NODE_PORT;

require("./config");

const User = require("./models/User");
const College = require("./models/College");
const universityRoutes = require('./routes/University');
const collegeRoutes = require('./routes/College');
const userRoutes = require('./routes/User');
const courseTypeRoutes = require('./routes/CourseType');
const noticeRoutes = require('./routes/Notice');
const noticeTypeRoutes = require('./routes/NoticeTypes');
const countryRoutes  = require('./routes/Country');
const stateRoutes = require('./routes/State');
const cityRoutes = require('./routes/City');
const districtRoutes = require('./routes/District');
const undertakingRoutes = require('./routes/Undertaking');
const collegeTypeRoutes = require('./routes/CollegeTypes');
const universityNoticeRoutes = require('./routes/UniversityNotice');
const frontendRoutes = require('./routes/Frontend');
const courseRoutes = require('./routes/Course');

const authenticate = (req, res, next) => {
   // const token = req.headers['authorization'];
    const authHeader = req.headers['authorization'];
    if (authHeader) {
        const token = authHeader.split(' ')[1]; // Remove "Bearer " from the token
        //console.log(token);
        jwt.verify(JSON.parse(token), process.env.JWT_SECRET, (err, decoded) => {
          if (err) {
            return res.status(401).send('Unauthorized');
            console.log(err);
          }
         // console.log(decoded);
          //req.user = decoded;
          next();
        });
      } else {
      res.status(401).send('Unauthorized');
    }
};

const app = express();
app.use(cors());
app.use(express.json());

const logRequests = (req, res, next) => {
    console.log(`${req.method} request for '${req.url}'`);
    next();
};

app.use(logRequests);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//Insert Data to User Collection
app.post('/signup',async(req,res)=>{
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
            result.password = undefined;
            jwt.sign({result},process.env.JWT_SECRET,{expiresIn:"2h"},(err,token)=>{
                if(err){
                    res.send({
                    success: false,
                    message: "Something went wrong"
                    });
                }
                res.send({
                success: true,
                message: "User register successfully",
                users: result,
                token:token
                });
            });
            
        }else{
            res.send({
            success: false,
            message: "No user found",
            users: result,
            });
        }
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

//Login 
app.post('/login',async(req,res)=>{
    if(req.body.email && req.body.password){
        const data = req.body;
        try {
            let result = await User.findOne({"email": data.email});
            if(result && ( await bcrypt.compare(data.password, result.password))){
                result.password = undefined;
                jwt.sign({result},process.env.JWT_SECRET,{expiresIn:"2h"},(err,token)=>{
                    if(err){
                        res.send({
                        success: false,
                        message: "Something went wrong"
                        });
                    }
                    res.send({
                    success: true,
                    message: "Login successfully",
                    users: result,
                    token:token
                    });
                });
                
                
            }else{
                res.send({
                success: false,
                message: "Wrong credential"
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



app.use('/frontend', frontendRoutes);
app.use(authenticate);

app.use('/college-notice', noticeRoutes);
app.use('/college', collegeRoutes);
app.use('/user', userRoutes);
app.use('/course-type', courseTypeRoutes);
app.use('/course', courseRoutes);
app.use('/notice-type', noticeTypeRoutes);
app.use('/country', countryRoutes);
app.use('/state', stateRoutes);
app.use('/city', cityRoutes);
app.use('/district', districtRoutes);
app.use('/university', universityRoutes);
app.use('/undertaking', undertakingRoutes);
app.use('/collegetypes', collegeTypeRoutes);
app.use('/university-notice', universityNoticeRoutes);







// Get All User Data
app.get('/',async(req,res)=>{
    try {
        let result = await User.find();
        if(result.length > 0){
            res.send({
            success: true,
            message: "Users get successfully",
            users: result,
            });
        }else{
            res.send({
            success: false,
            message: "No user found"
            });
        }
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});



app.listen(PORT,()=>{
    console.log("server connected with port : "+PORT);
});


// Get Single User Data By ID
app.get('/:id',async(req,res)=>{
    const id = req.params.id;
    try {
        let result = await User.find({"_id": id});
        if(result.length > 0){
            res.send({
            success: true,
            message: "Users get successfully",
            users: result,
            });
        }else{
            res.send({
            success: false,
            message: "No user found"
            });
        }
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});





app.get('/notice-list',async(req,res, next)=>{
    try {
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);

        const skip = (page -1) * size;

        const total = await College.countDocuments();
        const collegeData = await College.find().skip(skip).limit(size);

        res.json({
            records: collegeData,
            total,
            page, 
            size
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});