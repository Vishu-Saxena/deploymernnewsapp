const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    title: {
        type  : String,
        require : true
    },
    category : {
        type : String,
        require : true
    },
    video : {
        type : String,
        require : true
    },
    adminId : {
        type : String
    }
},{timestamps : true});

module.exports = mongoose.model('videos' , videoSchema);