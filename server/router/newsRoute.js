const express = require('express');
const router = express.Router();
const formidale = require('express-formidable');
const fs = require('fs');
const newsModal = require('../models//newsSchema');

// route to get all news 
router.get('/get-all' , async(req ,res)=>{
    try {
        
        const getNews = await newsModal.find({}).select('-image').select('-content').sort({"createdAt" :-1});
        if(getNews.length){
           return res.status(200).send({success : true , getNews});
        }else{
           return res.status(400).send({success : false , message: "No News Has been published yet"});
        }
   } catch (error) {
       console.log(error);
       return res.status(500).send({error , success : false})
   }
})
// route to get headlines 
router.get('/get-headlines' , async(req ,res)=>{
    try {
        
        const headline = await newsModal.find({}).select('-image').select('-content').sort( { "createdAt": -1 } ).limit(5);
        if(headline.length){
           return res.status(200).send({success : true , headline});
        }else{
           return res.status(400).send({success : false , message: "No News Has been published yet"});
        }
   } catch (error) {
       console.log(error);
       return res.status(500).send({error , success : false})
   }
})
        

// add news route 
router.post('/add-news' , formidale() , async(req ,res)=>{
    try {
        const {title , category ,discription ,content , adminId } = req.fields;
        // console.log(title , category ,discription ,content ,adminId );
        const{image} = req.files;
        if(!title || !category || !discription || !content || !keywords){
            return res.status(500).send({message : "required fields are not filled properly" , success :false})
        }
        if(image.size > 1000000){
            return res.status(500).send({message :"image is too big" ,success : false})
        }
        const news = new newsModal({...req.fields });
        if(image){
            news.image.data = fs.readFileSync(image.path);
            news.image.contentType = image.type;
        }
        await news.save();
        return res.status(200).send({message : "News added succefully" , success : true});

    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false})
    }
})

// route to get all the news published by a particular author
router.get('/get-news/:id' , async(req , res)=>{
    try {
         const {id} = req.params;
         const findNews = await newsModal.find({adminId : id}).select('-image').select('-content').sort({"createdAt":-1});
         if(findNews.length){
            return res.status(200).send({success : true , findNews});
         }else{
            return res.status(400).send({success : false , message: "No News Has been published yet"});
         }
    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false})
    }
})

// route to fetch the particular news
router.get('/get-single-news/:id' , async(req ,res)=>{
    try {
        const {id} = req.params;
        const news = await newsModal.findById(id).select('-image');
        if(news){
            return res.status(200).send({news , success : true});
        }
        return res.status(200).send({message : "seems like something wrong happened , please try again later"});
    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false})
    }
});

// route to get news according to category

router.get('/get-cnews/:category' , async(req ,res)=>{
    try {
        const {category} = req.params;
        const news = await newsModal.find({category : category}).select('-image').select('-content');
        if(news){
            return res.status(200).send({news , success : true});
        }
        return res.status(200).send({message : "seems like something wrong happened , please try again later"});
    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false})
    }
})

// route to get image
router.get('/get-image/:id' , async(req ,res)=>{
    try {
        const{id} = req.params;
        const newsimage = await newsModal.findById(id).select('image');
        if(newsimage){
            res.set('Content-type' , newsimage.image.contentType)
            return res.status(200).send(newsimage.image.data);
        }else{
            return res.status(500).send({message : "not found" , success : false})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false})
    }
});

// route to update news
router.post('/update-news/:id' , formidale() , async(req ,res)=>{
    try {
        const {id} = req.params;
        const {title , category ,discription ,content} = req.fields;
        // console.log(title , category ,discription ,content );
        const{image} = req.files;
        // console.log("image path" ,image.path);
        if(!title || !category || !discription || !content){
            return res.status(203).send({message : "required fields are not filled properly" , success :false})
        }
        if( image && image.size > 1000000){
            return res.status(202).send({message :"image is too big" ,success : false})
        }
        let updateNews = await newsModal.findByIdAndUpdate(id , {...req.fields} , {new : true});
        if(image){
            updateNews.image.data = fs.readFileSync(image.path);
            updateNews.image.contentType = image.type;
        } 
        await updateNews.save();
        return res.status(200).send({message : "News updated succefully" , success : true });

    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false})
    }
});


// route to delete the news
router.delete('/delete-news/:id' , async(req ,res)=>{
    try {
        const {id} = req.params;
        const deleteNews = await newsModal.findByIdAndDelete(id);
        if(deleteNews){
            return res.status(200).send({message : "news delted successfuly" , success :true })
        }else{
            return res.status(200).send({message : "news is not deleted , seems like an internal error"});
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({error , success : false})
    }
})

module.exports = router;