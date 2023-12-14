const bcrypt = require('bcrypt');


// fucntion to hash the password
const hashPassword = async(passwrd)=>{
    try {
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(passwrd , saltRounds);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
}

// function to compare password

const comparePassword = async(password  , hPassword)=>{
    try {
        const isMatch = await bcrypt.compare(password , hPassword);
        return isMatch;
    } catch (error) {
        console.log(error);
    }
}

module.exports ={hashPassword , comparePassword};