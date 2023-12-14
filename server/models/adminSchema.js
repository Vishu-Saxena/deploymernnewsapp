const mongoose = require('mongoose');
// creating schema
const adminSchema = new mongoose.Schema({
    name : {
        type : String,
        require : true,
    },
    email : {
        type : String,
        require : true,
    },
    password : {
        type : String,
        require : true,
    },
    country : {
        type : String,
        require : true
    },
    admin : {
        type : Boolean,
    },
    readlaterlist: [{
        type: String
    }]
}, {timestamps : true} );

module.exports = mongoose.model("admins" , adminSchema);//admins is collection name