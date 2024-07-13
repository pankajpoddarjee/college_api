var express = require('express');
var router = express.Router();
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');

var College = require('../models/College');
var CourseType = require('../models/CourseType');
var Course = require('../models/Course');
var CollegeNotice = require('../models/Notice');
var NewsLetter = require('../models/NewsLetter');
const transporter = require('../config/Nodemailer');

require('dotenv').config();


/* GET ALL COLLEGES */
router.get('/college', async function(req, res) {
    try {
        const page = parseInt(req.query.page);
        const size = parseInt(req.query.size);

        const skip = (page -1) * size;

        const total = await College.countDocuments();
        const collegeData = await College.find({}).populate('college_type').populate('undertaking').populate('affiliation').populate('country').populate('state').populate('city').populate('district').populate('course_type').skip(skip).limit(size).sort({ _id: -1 });

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


/* GET SINGLE COLLEGE BY ID */
router.get('/college/:slug', async function(req, res) {
    const slug = req.params.slug;
    try {
       
        const collegeData = await College.findOne({"slug": slug}).populate('college_type').populate('undertaking').populate('affiliation').populate('country').populate('state').populate('city').populate('district').populate('course_type');

        res.json({
            records: collegeData
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});

/* GET ALL Course Type */
router.get('/course-type', async function(req, res) {   debugger;
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

/* GET ALL Course Type */
router.get('/course', async function(req, res) {   debugger;
    try {
        const result = await Course.find({});
        
        res.json({
            records: result
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});
/* GET ALL Notice by College Id */
router.get('/college-notice', async function(req, res) {  
    const college_id = req.query.id; 
    try {        
        const result = await CollegeNotice.find({"college_id": college_id}).populate('notice_type_id').populate('college_id').populate('course_type_id');

        res.json({
            records: result
        });
    } catch(error) {
        console.log(error)
        res.status(400).json(error)
    }
});


/* SAVE COLLEGES */
router.post('/news-letter',async function(req, res, next) {
    if(req.body.newsletteremail){  
        const data = req.body;
        const doc = {
            email: data.newsletteremail
        };
        try {
            let newsLetter_ins = new NewsLetter(doc);
            let result = await newsLetter_ins.save();
            if(result){
                const email = data.newsletteremail;
                const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '3m' });
                const verificationUrl = `${process.env.NODE_APP_URL}frontend/news-letter/verify/${verificationToken}`;
                // Configure email data
                let mailOptions = {
                from: 'itsc.pankaj@gmail.com', // Sender address
                to: req.body.newsletteremail, // List of recipients
                subject: 'Test Email', // Subject line
                //text: 'Hello from Node.js!' // Plain text body
                html: `<table border="0" cellpadding="0" cellspacing="0" height="100%" width="100%"><tbody><tr><td align="center" valign="top"><div id="m_-2217610118668642025template_header_image"></div><table border="0" cellpadding="0" cellspacing="0" width="100%" id="m_-2217610118668642025template_container" style="background-color:#fff;border:1px solid #dedede;border-radius:3px" bgcolor="#fff"><tbody><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" id="m_-2217610118668642025template_header" style="background-color:#96588a;color:#fff;border-bottom:0;font-weight:700;line-height:100%;vertical-align:middle;font-family:&quot" bgcolor="#96588a"><tbody><tr><td id="m_-2217610118668642025header_wrapper" style="padding:36px 48px;display:block"><h1 style="font-family:&quot;font-weight:300;line-height:150%;margin:0;text-align:left;color:#fff;background-color:inherit" bgcolor="inherit">Confirm Your Email for Free Download Access!</h1></td></tr></tbody></table></td></tr><tr><td align="center" valign="top"><table border="0" cellpadding="0" cellspacing="0" width="100%" id="m_-2217610118668642025template_body"><tbody><tr><td valign="top" id="m_-2217610118668642025body_content" style="background-color:#fff" bgcolor="#fff"><table border="0" cellpadding="20" cellspacing="0" width="100%"><tbody><tr><td valign="top" style="padding:48px 48px 32px"><div id="m_-2217610118668642025body_content_inner" style="color:#636363;font-family:&quot;line-height:150%;text-align:left" align="left"><p style="margin:0 0 16px">Hello,</p><p style="margin:0 0 16px">Thank you for choosing BootstrapDash for your web development needs!</p><p style="margin:0 0 16px">To access your free download and gain exclusive entry to our collection of beautifully crafted themes and templates, along with insightful updates on the latest trends in web design, please verify your email address by clicking the link below:</p><p style="margin:0 0 16px"><a href="${verificationUrl}">${verificationUrl}</a></p><p style="margin:0 0 16px">We can not wait to help you elevate your projects with our resources. Thank you for being a part of BootstrapDash!</p><p style="margin:0 0 16px">Best regards,<br>BootstrapDash Team</p></div></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table></td></tr><tr><td align="center" valign="top"><table border="0" cellpadding="10" cellspacing="0" width="100%" id="m_-2217610118668642025template_footer"><tbody><tr><td valign="top" style="padding:0;border-radius:6px"><table border="0" cellpadding="10" cellspacing="0" width="100%"><tbody><tr><td colspan="2" valign="middle" id="m_-2217610118668642025credit" style="border-radius:6px;border:0;color:#8a8a8a;font-family:&quot;line-height:150%;text-align:center;padding:24px 0" align="center"><p style="margin:0 0 16px">Copyright © 2020 Bootstrap Dash, All rights reserved.<br>Our mailing address is: 3 Warren Yard, Wolverton Mill, Milton Keynes, England, MK12 5NW.</p></td></tr></tbody></table></td></tr></tbody></table></td></tr></tbody></table>` // HTML body (optional)
            };
            
            // Send email
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                return console.log('Error occurred:', error);
                }
                console.log('Email sent successfully!');

               return res.send({
                success: true,
                message: `Verification link sent successfully to ${email}. Please check your email. `,
                users: result
                });
            });


                res.send({
                success: true,
                message: "News letter insert successfully",
                users: result
                });
            }else{
                res.send({
                success: false,
                message: "News letter data not inserted"
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

// Email verification route
router.get('/news-letter/verify/:token', async (req, res) => {    
    const { token } = req.params;
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await NewsLetter.findOne({ email: decoded.email });
  
      if (!user) {
        return res.status(400).json({ error: 'Invalid token.' });
      }
        const doc = {
            is_verified: 1
        };
       // const options = { returnDocument: 'after' };
        await NewsLetter.findOneAndUpdate({"email": user.email},doc);
    
  
     // res.status(200).json({ message: 'Email verified successfully.' });
     res.redirect(`${process.env.REACT_APP_URL}?email=${user.email}`);
    } catch (error) {
      res.status(500).json({ error: 'The link was expired! Try again..' });
    }
  });
module.exports = router;