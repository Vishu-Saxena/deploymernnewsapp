const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const {hashPassword , comparePassword} = require('../helpers/authHelper');
const user = require('../models/userSchema');
const admin = require('../models/adminSchema');
const newsModal = require('../models//newsSchema');
const isuserloggedin = require('../middlewares/isUserLoggedin');

// route for user registeration
router.post('/register' , async(req , res)=>{
    try {
        const {name , email , password , country } = req.body;
        if(!name || !email || !password || !country ){
            return res.status(200).send({message : "fill all the required information properly" , success : false})
        }

        // checking whether user exist or not
        const userexist = await user.findOne({email : email});
        if(userexist){
            return res.status(200).send({message :"user with this email already exist" , success : false})
        }
        // saving user info
        let encryptedPassword = await hashPassword(password);
        const reguser = new user({name , email , password : encryptedPassword , country ,admin : false});
        await reguser.save();
        return res.status(200).send({message : "user registered successfully" , success : true})

    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false})
    }
});

// login route for user
router.post('/login' , async(req , res)=>{
    try {
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(200).send({message : "fill all the required information properly" , success : false})
        }

        // verifying user
        const loguser = await user.findOne({email : email});
        if(loguser){
            const decodepassword = await comparePassword(password , loguser.password );
            if(decodepassword){
                // creatinng jsonwebtoken 
                const token = await jwt.sign({_id : loguser._id }, process.env.SECRETKEY , {expiresIn : "7d",}); // jsonwebtoken created
                return res.status(200).send({message : "user login successfully" , token , userDetails : loguser ,success : true})
            }
            return res.status(200).send({message : "Invalid credentials" , success : false});
        }
        return res.status(200).send({message : "Invalid credentials" , success : false});
    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false})
    }
})

// route for admin registeration
router.post('/admin-register' , async(req , res)=>{
    try {
        const {name , email , password , country} = req.body;
        if(!name || !email || !password || !country){
            return res.status(200).send({message : "fill all the required information properly" , success : false})
        }

        // checking whether admin exist or not
        const adminexist = await admin.findOne({email : email});
        if(adminexist){
            return res.status(200).send({message :"admin with this email already exist" , success : false})
        }
        // saving admin info
        let encryptedPassword = await hashPassword(password);
        const regadmin = new admin({name , email , password : encryptedPassword , country , admin : true});
        await regadmin.save();
        return res.status(200).send({message : "admin registered successfully" , success : true})

    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false})
    }
});

// login route for admin
router.post('/admin-login' , async(req , res)=>{
    try {
        const {email , password} = req.body;
        if(!email || !password){
            return res.status(200).send({message : "fill all the required information properly" , success : false})
        }

        // verifying admin
        const loguser = await admin.findOne({email : email});
        if(loguser){
            const decodepassword = await comparePassword(password , loguser.password );
            if(decodepassword){
                // creatinng jsonwebtoken 
                const token = await jwt.sign({_id : loguser._id }, process.env.SECRETKEY , {expiresIn : "7d",}); // jsonwebtoken created
                return res.status(200).send({message : "admin logged in  successfully" , token , userDetails : loguser ,success : true})
            }
            return res.status(200).send({message : "Invalid credentials" , success : false});
        }
        return res.status(200).send({message : "Invalid credentials" , success : false});
    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false})
    }
});

// route to update user details
router.put('/update-user' , async(req , res)=>{
    try {
        const {name , email  , country, _id} = req.body;
        if(!name || !email || !country){
            return res.status(200).send({message : "fill all the required information properly" , success : false})
        }
        const updateProf = await user.findByIdAndUpdate(_id , {name , email, country });
        if(updateProf){
            console.log(updateProf);
            return res.status(200).send({message : "profile updated successfuly" , success : true , updateProf});
        }else{
            return res.status(500).send({message : "profile not updated successfuly" , success : false});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false})
    }
});

// route to delete admin account

router.delete('/delAdmin/:id' , async(req ,res)=>{
    try {
        const {id} = req.params;
        const deleteuser = await admin.findByIdAndDelete(id);
        if(deleteuser){
            return res.status(200).send({message : "Your is deleted successfully" ,success : true  , deleteuser});
        }else{
            return res.status(500).send({message : "Seems like this account doesnot exist or there is some internal error." , success : false , deleteuser })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false})
    }
})
// route to delete user account

router.delete('/deluser/:id' , async(req ,res)=>{
    try {
        const {id} = req.params;
        const deleteuser = await user.findByIdAndDelete(id);
        if(deleteuser){
            return res.status(200).send({message : "Your account is deleted successfully" ,success : true  , deleteuser});
        }else{
            return res.status(500).send({message : "Seems like this account doesnot exist or there is some internal error." , success : false , deleteuser })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false})
    }
})

// route to add the readlater list 
router.put('/readlist' , async(req ,res)=>{
    try {
        const {newsid , userID , isadmin } = req.body;
        console.log(isadmin);
        if(!newsid || !userID){
            return res.status(422).send({"message" : "Required data is not provided ."});
        }
        if(!isadmin){
            const {readlaterlist} = await user.findById(userID).select('readlaterlist');
            if(readlaterlist.includes(newsid)){return res.status(200).send({message : "News added successfuly" , success : true });}
            const updatedlist = readlaterlist.concat([newsid]);
            const addreadlist = await user.findByIdAndUpdate(userID , {readlaterlist : updatedlist});
            if(addreadlist){
                // console.log(addreadlist);
                return res.status(200).send({message : "News added successfuly" , success : true , addreadlist});
            }else{
                return res.status(500).send({message : "news not added successfuly" , success : false});
            }
        }else{
            const {readlaterlist} = await admin.findById(userID).select('readlaterlist');
            if(readlaterlist.includes(newsid)){return res.status(200).send({message : "News added successfuly" , success : true });}
            const updatedlist = readlaterlist.concat([newsid]);
            const addreadlist = await admin.findByIdAndUpdate(userID , {readlaterlist : updatedlist});
            if(addreadlist){
                // console.log(addreadlist);
                return res.status(200).send({message : "News added successfuly" , success : true , addreadlist});
            }else{
                return res.status(500).send({message : "news not added successfuly" , success : false});
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false});
    }
})
// route to remove news from readlater list 
router.put('/removefromreadlist' , async(req ,res)=>{
    try {
        const {newsid , userID , isadmin} = req.body;
        if(!newsid || !userID){
            return res.status(422).send({"message" : "Required data is not provided ."});
        }
        if(isadmin){
            const {readlaterlist} = await admin.findById(userID).select('readlaterlist');
            const updatedlist = readlaterlist.filter((id)=> id!== newsid);
            const addreadlist = await admin.findByIdAndUpdate(userID , {readlaterlist : updatedlist});
            if(addreadlist){
                // console.log(addreadlist);
                return res.status(200).send({message : "News removed successfuly" , success : true , addreadlist});
            }else{
                return res.status(500).send({message : "news not removed successfuly" , success : false});
            }
        }else{
            const {readlaterlist} = await user.findById(userID).select('readlaterlist');
            const updatedlist = readlaterlist.filter((id)=> id!== newsid);
            const addreadlist = await user.findByIdAndUpdate(userID , {readlaterlist : updatedlist});
            if(addreadlist){
                // console.log(addreadlist);
                return res.status(200).send({message : "News removed successfuly" , success : true , addreadlist});
            }else{
                return res.status(500).send({message : "news not removed successfuly" , success : false});
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false});
    }
})

// getting all newses stored for readlater
router.get('/getallreadlater/:userid', async(req ,res)=>{
    try {
        const {userid}= req.params;
        console.log(userid);
        const {readlaterlist} = await user.findById(userid).select("readlaterlist");
        const newslist = await newsModal.find({_id : {$in : readlaterlist}});
        // console.log(newslist);
        if(newslist){
            // console.log(newslist);
            return res.status(200).send({newses : newslist , success : true});
        }else{
            return res.status(400).send({success : false});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false});
    }
})
// getting all newses stored for readlater by admin
router.get('/getallreadlater-admin/:userid', async(req ,res)=>{
    try {
        const {userid} = req.params;
        // console.log(userid);
        const {readlaterlist} = await admin.findById(userid).select("readlaterlist");
        const newslist = await newsModal.find({_id : {$in : readlaterlist}});
        // console.log(newslist);
        if(newslist){
            if(!newslist.length){
                return res.status(202).send({message : "No news is saved for later read ." , success : false});
            }
            // console.log(newslist);
            return res.status(200).send({newses : newslist , success : true});
        }else{
            return res.status(400).send({success : false});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false});
    }
})

// test route 
router.get('/test' , isuserloggedin , (req ,res)=>{
    try {
        res.status(200).send({message : "test route"})
    } catch (error) {
        console.log(error);
    }
})
module.exports = router;