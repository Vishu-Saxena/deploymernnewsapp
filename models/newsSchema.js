const mongoose = require('mongoose');

const newsSchema = new mongoose.Schema({
    title: {
        type  : String,
        require : true
    },
    discription : {
        type : String,
        require : true
    }, 
    content : {
        type : String,
        require : true
    },
    category : {
        type : String,
        require : true
    },
    image : {
        data : Buffer,
        contentType : String,
    },
    adminId : {
        type : String
    }
},{timestamps : true});

module.exports = mongoose.model('newses' , newsSchema);