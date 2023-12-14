const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const admin = require('../models/adminSchema');
const videoModal = require('../models/videoSchema');

router.post('/addvideo' , async(req ,res)=>{
    try {
        const {title , category   ,video, adminId}  = req.body;
        // console.log(title , category ,video, adminId);
        if(!title || !category  || !video){
            return res.status(203).send({message : "required fields are not filled properly" , success :false})
        }
        // check whether this video already uploaded or not
        const existVideo = await videoModal.findOne({video : video});
        if(existVideo){return res.status(202).send({message : "Video already exist." , success : false})};
        const videonews = new videoModal({title , category   ,video, adminId});
        const addedVideo = await videonews.save();
        return res.status(200).send({message : "Video added succefully" , success : true});
    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false})
    }
});
router.get('/getvideo' , async(req ,res)=>{
    try {
        const getvideo = await videoModal.find({}).sort({"createdAt" : -1});
        // console.log(getvideo);
        if(getvideo.length){
            return res.status(200).send({videos : getvideo , success : true});
        }else{
            return res.status(201).send({message : "no video available right now." , success : false});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false})
    }
});
// route to get all the videos published by a particular author
router.get('/getvideo/:id' , async(req ,res)=>{
    try {
        const {id} = req.params;
        const getvideo = await videoModal.find({adminId : id}).sort({"createdAt" : -1}).select("video");
        // console.log(getvideo);
        if(getvideo.length){
            return res.status(200).send({videos : getvideo , success : true});
        }else{
            return res.status(201).send({message : "no video has been uploaded by you yet." , success : false});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false})
    }
});

// route to delete the video
router.delete('/deleteVideo/:id' , async(req , res)=>{
    try {
        const{id} = req.params;
        const delvid = await videoModal.findByIdAndDelete(id);
        if(delvid){
            return res.status(200).send({message : "Video deleted successfully" , success : true})
        }
        return res.status(500).send({message : "Sorry some interrupt has occured." , success : false})
    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false})
    }
})




module.exports = router;
