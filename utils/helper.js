const bcrypt = require('bcrypt');

module.exports.hashPassword=async(password)=> {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
}

module.exports.verifyPassword=async(password, hashedPassword) =>{
    const isPasswordValid = await bcrypt.compare(password, hashedPassword);
    return isPasswordValid;
}


